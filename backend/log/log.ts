import fs from "fs/promises";
import path from "path";

export default async function log(err: string) {
  try {
    const filePath = path.join(__dirname, "backend.log");
    const date = new Date().toLocaleTimeString();
    const time = new Date().toLocaleDateString();
    const message = `[${date} : ${time}]
    ${err}
    
    `;
    await fs.appendFile(filePath, message);
  } catch (error) {
    console.error("Error while logging ", error);
  }
}
