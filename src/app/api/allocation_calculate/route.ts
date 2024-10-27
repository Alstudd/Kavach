import { connectToDB } from "@/util/connectToDB";
import { NextRequest } from "next/server";
import disasterSchema from "@/models/disaster";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { disaster_id } = body;
    const disaster = await disasterSchema;

    return Response.json({ message: "Your voice has reached us", alert });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
