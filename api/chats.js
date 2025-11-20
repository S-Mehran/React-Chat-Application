import { connectDB, User, Chat, Message } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({ error: "Method not allowed" });
  }

  await connectDB();

  let chats = await Chat.find().lean();

  chats = await Promise.all(
    chats.map(async (chat) => {
      const lastMessage = await Message.findOne({ chat: chat._id })
        .sort({ createdAt: -1 })
        .lean();

      return {
        ...chat,
        lastMessage: lastMessage?.message || "No messages yet",
        timestamp: lastMessage?.createdAt || "",
        unread: 2,
        online: true,
      };
    })
  );

  return res.status(200).json(chats);
}
