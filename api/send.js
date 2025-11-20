import { connectDB, Message, User } from "./_db.js";
import Pusher from "pusher";

export default async function handler(req, res) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  });

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { sender, contact, message } = req.body;

  if (!message) return res.status(400).json({ error: "Message required" });
  if (!sender) return res.status(400).json({ error: "sender required" });
  if (!contact) return res.status(400).json({ error: "contact required" });

  await connectDB();

  const user = await User.findOne({ name: sender.name }).lean();

  if (user) {
    const msg = await Message.create({ chat: contact, user: user._id, message });

    const msgData = {
      id: msg._id,
      text: msg.message,
      sender: sender.name,
      timestamp: new Date(msg.createdAt),
    };

    await pusher.trigger("chat-channel", "new-message", msgData);

    res.status(201).json(msg);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
