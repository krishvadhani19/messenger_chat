import { NextApiResponseServerIO } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export async function POST(req: NextRequest, res: NextApiResponseServerIO) {
  try {
    const server = (res.socket as any).server;
    const io = (server as any).io;

    if (!io) {
      console.error("Socket.IO server not initialized");
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    // io.on("connection", (socket: Socket) => {
    //   socket.on("message1", (data) => {
    //     console.log({ data });
    //   });

    // });

    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 200 });
  }
}
