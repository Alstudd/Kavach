import Help from "@/models/help";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const requesturl = new URL(req.url);

    await connectToDB();
    if (requesturl.searchParams.get("id")) {
      const id = requesturl.searchParams.get("id");
      const help = await Help.findById(id);
      return Response.json(help);
    }
    const help = await Help.find();
    return Response.json(help);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { phoneNumber, description, image_url, location, State, City } = body;
    const help = new Help({
      phoneNumber,
      description,
      image_url,
      location,
      State,
      City,
    });
    await help.save();
    return Response.json({ message: "Your voice has reached us", help });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
