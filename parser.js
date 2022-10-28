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
    console.log("=============================\n");
    fsSync.mkdirSync(dir);
  }
}

export async function saveToFile(params, profile, region) {
  isDir();

  const data = JSON.stringify(params, null, 2);
  const output = {
    dir: ssmConfigOptions.outputDir,
    head: region.toLowerCase().slice(0, 2),
    mid: region[3],
    tail: region[region.length - 1],
    profile: profile.toLowerCase(),
  };
  const fileName = `${output.dir}/${output.profile}-${output.head}${output.mid}${output.tail}.json`;

  await fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}
