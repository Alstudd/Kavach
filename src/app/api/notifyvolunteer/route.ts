import disasterSchema from "@/models/disaster";
import axios from "axios";
import { connectToDB } from "@/util/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { disaster_id, message } = body;

    // Find the disaster by ID
    const disaster = await disasterSchema.findById(disaster_id);
    console.log(disaster);

    // Check if the disaster exists
    if (!disaster) {
      return NextResponse.json(
        { error: "Disaster not found" },
        { status: 404 }
      );
    }

    // Retrieve the data you want (e.g., description) and construct the message
    const content = `🚨 **Disaster Alert** 🚨
**Location**: ${disaster.location}
**Disaster Type**: ${disaster.disasterType}
**Description**: ${disaster.description}
**Status**: ${disaster.status}
**Help ID**: ${disaster.help_id}
**Created At**: ${new Date(disaster.createdAt).toLocaleString()}
**Updated At**: ${new Date(disaster.updatedAt).toLocaleString()}

**Additional Message**: ${message}`;
    // Send the message to Discord webhook
    const DiscordResponse = await axios.post(
      "https://discord.com/api/webhooks/1299904564098760775/nrgpZSiIjmPVoWG9sEZ-JafhhHa1Qw3mBRqg97sQZ-7xPkOWRttQOHnIZK2JJYLojmXQ",
      {
        content: content, // Send the constructed message as the content
      }
    );

    console.log(`Discord response status: ${DiscordResponse}`); // Log status for confirmation
    return NextResponse.json({ message: "Your voice has reached us" });
  } catch (error) {
    console.error(error); // Log the error
    return NextResponse.json({ error: "An error occurred" });
  }
}
