import disasterSchema from "@/models/disaster";
import donationBlinkSchema from "@/models/donation_blink";
import donationSchema from "@/models/donation";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  MEMO_PROGRAM_ID,
} from "@solana/actions";
import {
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { NextRequest } from "next/server";
export async function GET(req: Request) {
  const requesturl = new URL(req.url);
  const donationblinkId = requesturl.searchParams.get("id");
  let disasterData;
  if (donationblinkId) {
    const donationBlink = await donationBlinkSchema.findById(donationblinkId);
    disasterData = await disasterSchema.findById(donationBlink.disaster_id);
  }
  const actionURL = "/api/actions/donation";
  const payload: ActionGetResponse = {
    type: "action",
    icon: "https://img.lovepik.com/element/45009/1635.png_860.png",
    label: "Auction",
    title: disasterData?.disasterType,
    description: disasterData?.description,
    disabled: false,
    links: {
      actions: [
        {
          type: "transaction",
          href: `${actionURL}?amount={amount}&donationblinkId=${donationblinkId}`,
          label: "Enter the amount you want to bid",
          parameters: [
            {
              name: "amount",
              label: "Enter your name",
              required: true,
              type: "number",
            },
          ],
        },
      ],
    },
  };
  return Response.json(payload, {
    headers: {
      ...ACTIONS_CORS_HEADERS,
    },
  });
}
export const OPTIONS = GET;
export async function POST(req: NextRequest) {
  try {
    const body: ActionPostRequest = await req.json();
    let account: PublicKey;
    const requesturl = new URL(req.url);
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return new Response("Invalid Account", {
        status: 400,
        headers: {
          ...ACTIONS_CORS_HEADERS,
          "X-Action-Version": "2.1.3",
          "X-Blockchain-Ids": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        },
      });
    }

    console.log("Account", account.toBase58());

    let amount: number;
    // Safely parse the value as a float
    amount = requesturl.searchParams.get("amount");
    const donationblinkId = requesturl.searchParams.get("donationblinkId");

    const connection = new Connection(
      `https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
    );

    const donationBlink = new donationSchema({
      walletAddress: account,
      amount: amount,
      donation_blink_id: donationblinkId,
    });
    await donationBlink.save();

    const ToAccountAddress = new PublicKey(
      "2ZxYNf2kpRzVhsn1K1drjstY2xGpSj11uQRh7ae475ee"
    );
    console.log(connection);
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: ToAccountAddress,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // get the latest blockhash amd block height
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    // create a legacy transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} SOL to ${ToAccountAddress.toBase58()}`,
      },
      // note: no additional signers are needed
      // signers: [],
    });

    return Response.json(payload, {
      headers: {
        ...ACTIONS_CORS_HEADERS,
        "X-Action-Version": "2.1.3",
        "X-Blockchain-Ids": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      },
    });
  } catch (error) {
    return Response.json(
      { error },
      {
        headers: {
          ...ACTIONS_CORS_HEADERS,
          "X-Action-Version": "2.1.3",
          "X-Blockchain-Ids": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        },
      }
    );
  }
}
