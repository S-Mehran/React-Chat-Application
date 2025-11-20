import { connectDB, User, Chat, Message } from "./api/_db.js";

async function seedDatabase() {
  try {
    await connectDB();
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create users
    const users = await User.insertMany([
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
      { name: "Alice Brown" },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create chats
    const chats = await Chat.insertMany([
      { name: "General" },
      { name: "Random" },
      { name: "Tech Talk" },
    ]);
    console.log(`✅ Created ${chats.length} chats`);

    // Create messages
    const messages = await Message.insertMany([
      {
        message: "Hey everyone! Welcome to the chat.",
        user: users[0]._id,
        chat: chats[0]._id,
      },
      {
        message: "Hi John! Great to be here.",
        user: users[1]._id,
        chat: chats[0]._id,
      },
      {
        message: "This is awesome!",
        user: users[2]._id,
        chat: chats[0]._id,
      },
      {
        message: "Anyone want to discuss JavaScript?",
        user: users[0]._id,
        chat: chats[2]._id,
      },
      {
        message: "I'm in! Love JavaScript.",
        user: users[3]._id,
        chat: chats[2]._id,
      },
      {
        message: "What's everyone's favorite framework?",
        user: users[1]._id,
        chat: chats[2]._id,
      },
    ]);
    console.log(`✅ Created ${messages.length} messages`);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase();
