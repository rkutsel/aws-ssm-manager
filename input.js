import inquirer from "inquirer";
import parseAwsConfig from "./parser.js";

export function initialQuestion() {
  return inquirer.prompt([
    {
      type: "list",
      name: "actionType",
      message: "Choose action type:",
      choices: ["Create New Secret", "Delete Existing Secret"],
    },
  ]);
}

export function createQuestions() {
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
      choices: ["US-WEST-2", "US-EAST-1", "EU-WEST-1"],
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
      type: "editor",
      name: "tags",
      message: "Press enter if you'd like to add tags OR CNTRL + C to EXIT",
      default: '[{"Key": "KEY_NAME","Value": "KEY_VALUE"}]',
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

export function deleteQuestions() {
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
      choices: ["US-WEST-2", "US-EAST-1", "EU-WEST-1"],
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
