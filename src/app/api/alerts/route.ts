import alertSchema from "@/models/alerts";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const requesturl = new URL(req.url);

    await connectToDB();
    const alertId = requesturl.searchParams.get("id");

    if (alertId) {
      const alert = await alertSchema.findById(alertId);
      return Response.json(alert);
    }

    const alert = await alertSchema.find();
    return Response.json(alert);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { disaster_id, description, instruction } = body;
    const alert = new alertSchema({ disaster_id, description, instruction });
    await alert.save();
    return Response.json({ message: "Your voice has reached us", alert });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
