"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = require("../src/db");
const note_1 = require("../src/models/note");
async function run() {
  await (0, db_1.connectMongo)();
  await note_1.NoteModel.deleteMany({});
  await note_1.NoteModel.create([
    { content: "Learn Full Stack Open (Notes app)", important: false },
    { content: "Buy milk", important: true },
  ]);
  console.log("✅ Seeded");
  await (0, db_1.disconnectMongo)();
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
