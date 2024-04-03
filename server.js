import express from "express";
import path from "path";
import pg from "pg";
import * as dotenv from 'dotenv';
import fs from "fs";
import { time } from "console";
import nocache from "nocache";

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

app.use(nocache());
app.use("/", express.static(process.cwd() + "/pages"));

// ! Query handler
let queryFolders = fs.readdir("queries", (err, folders) => {
    if (err) {
      console.error("Could not open query folder.");
      process.exit(1);
    }
    
    folders.forEach(folder => {
      console.log("Opened folder: " + folder)
      fs.readdir(path.join("queries", folder), (err, queryFiles) => {

        if(err) {
          console.error("Could not open file: " + folder);
          process.exit(1);
        }

        queryFiles.forEach(async queryFile => {
          console.log("Opened query file: " + queryFile);
          let path = "/queries/" + folder + "/" + queryFile;
          app.get(path.replace(/\.js/, ""), async (req, res) => { (await import(process.cwd() + path)).default.run(req, res, postgres) });
        })
      });
    })
})

setTimeout(() => {
  app.all("*", (req, res) => {
    res.status(302).redirect("/");
  });

  app.listen(2532, () => {
    console.log("CSI2532 server online, listening on port 2532.");
  });

}, 2500);

