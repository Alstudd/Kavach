import resourceAllocationSchema from "@/models/resourceAllocation";
import resourceSchema from "@/models/resource";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    const requestUrl = new URL(req.url);
    await connectToDB();

    if (requestUrl.searchParams.get("id")) {
      const resourceAllocation = await resourceAllocationSchema.findById(
        requestUrl.searchParams.get("id")
      );
      return Response.json(resourceAllocation);
    }

    const resourceAllocations = await resourceAllocationSchema.find();
    return Response.json(resourceAllocations);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectToDB();
    const body = await req.json();
    const { resource_id, disaster_id, quantity } = body;

    // Create resource allocation entry
    const resourceAllocation = new resourceAllocationSchema({
      resource_id,
      disaster_id,
      quantity,
    });
    await resourceAllocation.save({ session });

    // Update resource quantity
    const resource = await resourceSchema.findByIdAndUpdate(
      resource_id,
      { $inc: { quantity: -quantity } },
      { session, new: true }
    );

    if (!resource) {
      throw new Error("Resource not found");
    }

    await session.commitTransaction();
    session.endSession();

    return Response.json({
      message: "Resource Allocated Successfully",
      resourceAllocation,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return NextResponse.json({ error });
  }
}
