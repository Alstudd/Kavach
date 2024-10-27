import disasterSchema from "@/models/disaster";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const requesturl = new URL(req.url);

    await connectToDB();
    const disasterId = requesturl.searchParams.get("id");
    const type = requesturl.searchParams.get("type");
    if (disasterId || type) {
      const disaster = await disasterSchema.find({
        $or: [{ _id: disasterId }, { type: type }],
      });
      return Response.json(disaster);
    }
    if (disasterId && type) {
      const disaster = await disasterSchema.find({
        $and: [{ _id: disasterId }, { type: type }],
      });
      return Response.json(disaster);
    }
    const disaster = await disasterSchema.find();
    return Response.json(disaster);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { location, disasterType, description, help_id, status } = body;
    const disaster = new disasterSchema({
      location,
      disasterType,
      description,
      help_id,
      status,
    });
    await disaster.save();
    return Response.json({ message: "Your voice has reached us", disaster });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
