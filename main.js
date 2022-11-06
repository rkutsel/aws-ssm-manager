import {
  initialQuestion,
  askCreate,
  askGet,
  askGetDecrypted,
  askUpdate,
  askDelete,
  askTag,
} from "./input.js";

import { ssmSdk } from "./sdk-ssm.js";

export default function init() {
  initialQuestion().then((answer) => {
    const { actionType: action } = answer;

    switch (action) {
      case "Create New Secret":
        askCreate().then((answers) => {
          const {
            secretName: secret,
            secretValue: value,
            awsAccount: profile,
            awsRegion: region,
            chooseToTag: toTag,
          } = answers;
          if (toTag === "YES") {
            askTag().then((answer) => {
              const { tags: tags } = answer;
              ssmSdk.createOne(secret, value, profile, region, tags);
            });
          } else {
            ssmSdk.createOne(secret, value, profile, region);
          }
        });
        break;
      case "Get All Secrets":
        askGet().then((answers) => {
          const {
            secretType: type,
            outputFormat: format,
            awsAccount: profile,
            awsRegion: region,
          } = answers;
          ssmSdk.getAll(type, format, profile, region);
        });
        break;
      case "Get Decrypted Secret":
        askGetDecrypted().then((answers) => {
          const {
            secretName: secret,
            awsAccount: profile,
            awsRegion: region,
          } = answers;
          ssmSdk.getDecrypted(secret, profile, region);
        });
        break;
      case "Update Existing Secret":
        askUpdate().then((answers) => {
          const {
            secretName: secret,
            secretValue: value,
            awsAccount: profile,
            awsRegion: region,
          } = answers;
          ssmSdk.updateOne(secret, value, profile, region);
        });
        break;
      case "Delete Existing Secret":
        askDelete().then((answers) => {
          const {
            secretName: secret,
            awsAccount: profile,
            awsRegion: region,
          } = answers;
          ssmSdk.deleteOne(secret, profile, region);
        });
        break;
      case "Exit":
        console.log("Exited cli prompt.");
        break;
    }
  });
}
