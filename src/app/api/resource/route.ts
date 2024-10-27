import resourceSchema from "@/models/resource";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const requesturl = new URL(req.url);

    await connectToDB();
    const resourceId = requesturl.searchParams.get("id");
    const type = requesturl.searchParams.get("type");
    if (resourceId || type) {
      const resource = await resourceSchema.find({
        $or: [{ _id: resourceId }, { type: type }],
      });
      return Response.json(resource);
    }
    if (resourceId && type) {
      const resource = await resourceSchema.find({
        $and: [{ _id: resourceId }, { type: type }],
      });
      return Response.json(resource);
    }
    const resource = await resourceSchema.find();
    return Response.json(resource);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { resourceName, type, quantity, location } = body;
    const resource = new resourceSchema({
      resourceName,
      type,
      quantity,
      location,
    });
    await resource.save();
    return Response.json({ message: "Your voice has reached us", resource });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
