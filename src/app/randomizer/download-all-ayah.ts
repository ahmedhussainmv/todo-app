"use server";
import { writeFile } from "fs";
import path from "path";

const ayahJson = path.join(process.cwd(), "./ayahs.json");
console.log(ayahJson);

export async function downloadAndSaveAyahToJsonFile() {
  const ayahs = [];
  for (let i = 1; i <= 6236; i++) {
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${i}`);
    const data = await response.json();
    const ayah = data.data;
    ayahs.push(ayah);
  }
  writeFile(ayahJson, JSON.stringify(ayahs, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  });
}
