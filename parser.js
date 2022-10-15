import fs from "fs/promises";

const homeDir = process.env.HOME;
const awsConfig = `${homeDir}/.aws/credentials`;

export default async function parseAwsConfig() {
  const configFile = await fs
    .readFile(awsConfig)
    .catch((err) => console.error(`Failed to read ${awsConfig} file`, err));

  const profileList = await configFile
    .toString()
    .split("\n")
    .filter((profiles) => profiles[0] === "[");
  return profileList;
}
