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

export async function isDir() {
  const dir = ssmConfigOptions.outputDir;
  if (!fsSync.existsSync(dir)) {
    console.log(`Creating ${dir} directory...`);
    fsSync.mkdirSync(dir);
  }
}
