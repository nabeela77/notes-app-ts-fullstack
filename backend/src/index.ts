import "dotenv/config";
import { app } from "./app";
import { connectMongo, disconnectMongo } from "./db";

const PORT = Number(process.env.PORT) || 4000;

async function main() {
  await connectMongo();
  // console.log(process.env.PORT);
  app.listen(PORT, () => {
    console.log(`HTTP server on :${PORT}`);
  });
}
main().catch((err) => {
  console.error("error", err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await disconnectMongo();
  process.exit(0);
});
