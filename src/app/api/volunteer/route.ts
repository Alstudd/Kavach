import volunteerSchema from "@/models/volunteer";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const requesturl = new URL(req.url);

    await connectToDB();
    const volunteerId = requesturl.searchParams.get("id");

    if (volunteerId) {
      const volunteer = await volunteerSchema
        .findById(volunteerId)
        .populate("disaster_id");
      return Response.json(volunteer);
    }

    const volunteer = await volunteerSchema.find().populate("disaster_id");
    return Response.json(volunteer);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, disaster_id } = body;
    const volunteer = new volunteerSchema({
      email,
      disaster_id,
    });
    await volunteer.save();
    return Response.json({ message: "Your voice has reached us", volunteer });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
