// Create an admin, or reset an existing admin's password.
// Run from the Server folder:  npm run set-admin
import "../Config/env.js"; // must be first

import readline from "node:readline";
import { Writable } from "node:stream";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "../Config/db.js";
import Admin from "../Models/admin.js";

const MIN_PASSWORD_LENGTH = 8;

// readline echoes what you type through `output`, so routing it through
// a stream we can mute hides the password while it's typed.
let muted = false;
const output = new Writable({
  write(chunk, encoding, callback) {
    if (!muted) process.stdout.write(chunk, encoding);
    callback();
  },
});

const rl = readline.createInterface({
  input: process.stdin,
  output,
  terminal: Boolean(process.stdin.isTTY),
});
const lines = rl[Symbol.asyncIterator]();

rl.on("SIGINT", () => {
  process.stdout.write("\nCancelled.\n");
  process.exit(130);
});

// Everything typed after the username is a password, so stop echoing the
// moment that first line ends, even if the rest was pasted in one go.
rl.once("line", () => {
  muted = true;
});

const ask = async (question, { hidden = false } = {}) => {
  if (hidden) {
    process.stdout.write(question); // straight to the screen: output is muted
  } else {
    rl.setPrompt(question);
    rl.prompt();
  }
  const { value, done } = await lines.next();
  if (hidden && rl.terminal) process.stdout.write("\n");
  if (done) throw new Error("No input received, nothing changed.");
  return value;
};

try {
  if (!rl.terminal) {
    console.log("Note: this terminal can't hide typing, so the password will be visible.");
  }

  const username = (await ask("Admin username: ")).trim();
  if (!username) throw new Error("Username is required, nothing changed.");

  const password = await ask(
    `New password (at least ${MIN_PASSWORD_LENGTH} characters): `,
    { hidden: true },
  );
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters, nothing changed.`,
    );
  }

  const confirm = await ask("Type it again: ", { hidden: true });
  if (confirm !== password) throw new Error("Passwords don't match, nothing changed.");

  rl.close();
  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.findOne({ username });

  if (admin) {
    admin.password = hashedPassword;
    // 1s back so a login made right after this still counts as newer
    admin.passwordChangedAt = new Date(Date.now() - 1000);
    await admin.save();
    console.log(`\nPassword changed for "${username}". Anyone logged in as them has been signed out.`);
  } else {
    await Admin.create({ username, password: hashedPassword });
    console.log(`\nAdmin "${username}" created. You can log in at /admin/login.`);
  }

  const admins = await Admin.find().sort({ createdAt: 1 });
  console.log("\nAdmin accounts in the database:");
  for (const { username: name, createdAt } of admins) {
    const created = createdAt ? createdAt.toISOString().slice(0, 10) : "unknown date";
    console.log(`  - ${name} (created ${created})`);
  }
  console.log("If you don't recognise one, delete it in MongoDB Atlas (Browse Collections > admins).");
} catch (error) {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
} finally {
  rl.close();
  await mongoose.disconnect();
}
