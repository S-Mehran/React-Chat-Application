import { connectDB, Message } from "./_db.js";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { user, chat, message } = req.body;

  if (!message) return res.status(400).json({ error: "Message required" });
  if (!chat) return res.status(400).json({ error: "Chat required" });
  if (!user) return res.status(400).json({ error: "User required" });

  await connectDB();
  const msg = await Message.create({ chat, user, message });

  await pusher.trigger("chat-channel", "new-message", msg);

  res.status(201).json(msg);
}
