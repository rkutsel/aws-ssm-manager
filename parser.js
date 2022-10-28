import fs from "fs/promises";
import * as fsSync from "fs";
import { ssmConfigOptions } from "./config.js";

export async function parseAwsConfig() {
  const homeDir = process.env.HOME;
  const awsConfig = `${homeDir}/.aws/credentials`;

  const configFile = await fs
    .readFile(awsConfig)
    .catch((err) => console.error(`Failed to read ${awsConfig} file`, err));

  const profileList = await configFile
    .toString()
    .split("\n")
    .filter((profiles) => profiles[0] === "[");
  return profileList;
}

export function isDir() {
  const dir = ssmConfigOptions.outputDir;

  if (!fsSync.existsSync(dir)) {
    console.log(`Creating ${dir} directory...`);
    fsSync.mkdirSync(dir);
  }
}

export async function saveToFile(params, profile, region) {
  isDir();

  const dir = ssmConfigOptions.outputDir;
  const head = region.toLowerCase().slice(0, 2);
  const mid = region[3];
  const tail = region[region.length - 1];
  const fileName = `${dir}/${profile.toLowerCase()}-${head}${mid}${tail}.json`;

  let data = JSON.stringify(params, null, 2);

  await fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}
