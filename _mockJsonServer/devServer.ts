import jsonServer from "json-server";
import express from "express";
import cors from "cors";
import path from "path";
import * as fs from "fs";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "static")));

const tables = {};
const tablesFiles = fs.readdirSync("tables");

tablesFiles.forEach((fileName) => {
    if (!fileName.endsWith(".json")) return;
    try {
        const table = fs.readFileSync(`tables/${fileName}`, "utf8");
        tables[fileName.substring(0, fileName.length - 5)] = JSON.parse(table.toString());
    } catch (e) {
        console.log(fileName, "******************", e);
    }
});

app.use(jsonServer.router(tables));

// @ts-ignore
app.listen(PORT, (err: Error) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
