import "dotenv/config";
import { connectMongo, disconnectMongo } from "../src/db";
import { NoteModel } from "../src/models/note";

async function run() {
  await connectMongo();
  await NoteModel.deleteMany({});
  await NoteModel.create([
    { content: "Full Stack Notes app", important: false },
    { content: "Buy milk", important: true },
  ]);
  console.log(" Seeded");
  await disconnectMongo();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
