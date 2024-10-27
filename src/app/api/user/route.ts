import userSchema from "@/models/user";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const requesturl = new URL(req.url);

    await connectToDB();
    const email = requesturl.searchParams.get("email");
    if (email) {
      const user = await userSchema.find({
        email: email,
      });
      return Response.json(user);
    }

    const user = await userSchema.find();
    return Response.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email } = body;
    const user = new userSchema({
      email,
    });
    await user.save();
    return Response.json({ message: "User is reg", user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
