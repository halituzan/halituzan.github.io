import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // JSON dosyasının yolunu oluşturuyoruz
    const filePath = path.join(process.cwd(), "data", "words.json");
    const fileContents = fs.readFileSync(filePath, "utf8");

    // JSON verisini alıyoruz

    const data = JSON.parse(fileContents);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Failed to load data" });
  }
}
