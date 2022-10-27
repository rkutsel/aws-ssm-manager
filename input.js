import inquirer from "inquirer";
import { parseAwsConfig } from "./parser.js";
import { ssmConfigOptions } from "./config.js";

export function initialQuestion() {
  return inquirer.prompt([
    {
      type: "list",
      name: "actionType",
      message: "Choose action type:\n  ======================",
      choices: [
        "Create New Secret",
        "Get All Secrets",
        "Update Existing Secret",
        "Delete Existing Secret",
        "Exit",
      ],
    },
  ]);
}

export function askCreate() {
  return inquirer.prompt([
    {
      type: "list",
      name: "awsAccount",
      message: "Choose AWS account from the list:",
      choices: parseAwsConfig,
      filter(val) {
        return val.slice(1, -1);
      },
    },
    {
      type: "list",
      name: "awsRegion",
      message: "Choose AWS region",
      choices: ssmConfigOptions.regions,
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: "input",
      name: "secretName",
      message: "Provide secret name. i.e. /DEV/SECRET:",
    },
    {
      type: "password",
      name: "secretValue",
      message: "Provide secret value",
      mask: "*",
    },
    {
      type: "list",
      name: "chooseToTag",
      message: "Would you like to add tags?",
      choices: ["YES", "NO"],
    },
  ]);
}

export function askTag() {
  return inquirer.prompt([
    {
      type: "editor",
      name: "tags",
      message: "Press enter if you'd like to add tags OR CNTRL + C to EXIT",
      default:
        '[{"Key": "Name","Value": "Name"}, {"Key": "Description","Value": "Description"}, {"Key": "Owner","Value": "Dev"}, {"Key": "Request number","Value": "REQUEST-XXXX"}]',
      validate(text) {
        if (text.split("\n").length < 1) {
          return "Must be at least 1 line long.";
        }
        return true;
      },
      waitUserInput: true,
    },
  ]);
}

export function askGet() {
  return inquirer.prompt([
    {
      type: "list",
      name: "awsAccount",
      message: "Choose AWS account from the list:",
      choices: parseAwsConfig,
      filter(val) {
        return val.slice(1, -1);
      },
    },
    {
      type: "list",
      name: "awsRegion",
      message: "Choose AWS region",
      choices: ssmConfigOptions.regions,
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: "list",
      name: "secretType",
      message: "Choose secret type to display:",
      choices: ["SecureString", "String"],
    },
    {
      type: "list",
      name: "outputFormat",
      message: "Choose format type to display:",
      choices: ["Text", "JSON"],
    },
  ]);
}

export function askUpdate() {
  return inquirer.prompt([
    {
      type: "list",
      name: "awsAccount",
      message: "Choose AWS account from the list:",
      choices: parseAwsConfig,
      filter(val) {
        return val.slice(1, -1);
      },
    },
    {
      type: "list",
      name: "awsRegion",
      message: "Choose AWS region",
      choices: ssmConfigOptions.regions,
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: "input",
      name: "secretName",
      message: "Provide secret name. i.e. /DEV/SECRET:",
    },
    {
      type: "password",
      name: "secretValue",
      message: "Provide secret value",
      mask: "*",
    },
  ]);
}

export function askDelete() {
  return inquirer.prompt([
    {
      type: "list",
      name: "awsAccount",
      message: "Choose AWS account from the list:",
      choices: parseAwsConfig,
      filter(val) {
        return val.slice(1, -1);
      },
    },
    {
      type: "list",
      name: "awsRegion",
      message: "Choose AWS region",
      choices: ssmConfigOptions.regions,
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: "input",
      name: "secretName",
      message: "Provide secret name. i.e. /DEV/SECRET:",
    },
  ]);
}
