import {
  initialQuestion,
  askCreate,
  askGet,
  askUpdate,
  askDelete,
  askTag,
} from "./input.js";
import {
  createSecret,
  getSecrets,
  updateSecret,
  deleteSecret,
} from "./sdk-ssm.js";

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
              createSecret(secret, value, profile, region, tags);
            });
          } else {
            createSecret(secret, value, profile, region);
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
          getSecrets(type, format, profile, region);
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
          updateSecret(secret, value, profile, region);
        });
        break;
      case "Delete Existing Secret":
        askDelete().then((answers) => {
          const {
            secretName: secret,
            awsAccount: profile,
            awsRegion: region,
          } = answers;
          deleteSecret(secret, profile, region);
        });
        break;
      case "Exit":
        console.log("Exited cli prompt.");
        break;
    }
  });
}
