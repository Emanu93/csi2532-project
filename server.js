import express from "express";
import path from "path";
import pg from "pg";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

const postgres = new pg.Client({
  host: "localhost",
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT),
  database: 'csi2532',
  password: process.env.DB_PASSWORD
})

await postgres.connect();

console.log(await postgres.query("SELECT NOW()"))

app.use("/", express.static(process.cwd() + "/pages"));

app.all("*", (req, res) => {
  res.status(302).redirect("/");
});

app.listen(2532, () => {
  console.log("CSI2532 server online, listening on port 2532.");
});

