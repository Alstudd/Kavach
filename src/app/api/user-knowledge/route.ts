import { NextRequest, NextResponse } from "next/server";
import userKnowledgeSchema from "@/models/userKnowledge";
import { connectToDB } from "@/util/connectToDB";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, disaster_id, description } = body;
    const userKnowledgeSchemaData = new userKnowledgeSchema({
      email,
      disaster_id,
      description,
    });
    await userKnowledgeSchemaData.save();
    return Response.json({
      message: "Your voice has reached us",
      userKnowledgeSchemaData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
