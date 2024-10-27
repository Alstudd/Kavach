import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import disasterSchema from "@/models/disaster";
import resources from "@/models/resource";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { disaster_id } = body;
    const disasterData = await disasterSchema.findById(disaster_id);
    const Availableresource = await resources.find();
    const previous_allocation = {};
    console.log(disasterData);
    console.log(Availableresource);
    console.log(previous_allocation);
    const Results = await axios.post("http://localhost:5000/allocate", {
      resources: Availableresource,
      disaster_properties: disasterData,
      previous_allocations: previous_allocation,
    });
    console.log(Results.data);
    const data = Results.data;

    return Response.json(data);

    return Response.json({ message: "Your voice has reached us", alert });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
