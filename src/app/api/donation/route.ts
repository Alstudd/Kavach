import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import donationSchema from "@/models/donation";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const blink = await donationSchema.find();
    return Response.json(blink);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { disaster_id } = body;
    const disaster = new donationBlinkSchema({
      disaster_id,
    });
    const blink = await disaster.save();

    return Response.json({
      link: `http://localhost:3000/api/actions/donation?id=${blink._id}`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
