import userSchema from "@/models/user";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const requesturl = new URL(req.url);

    await connectToDB();
    const userId = requesturl.searchParams.get("id");
    const type = requesturl.searchParams.get("type");
    if (userId || type) {
      const user = await userSchema.find({
        $or: [{ _id: userId }, { userType: type }],
      });
      return Response.json(user);
    }
    if (userId && type) {
      const user = await userSchema.find({
        $and: [{ _id: userId }, { userType: type }],
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
    const {
      username,
      name,
      phoneNumber,
      email,
      password,
      aadharNumber,
      userType,
    } = body;
    const user = new userSchema({
      username,
      name,
      phoneNumber,
      email,
      password,
      aadharNumber,
      userType,
    });
    await user.save();
    return Response.json({ message: "User is reg", user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
