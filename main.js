import {
  initialQuestion,
  askCreate,
  askGet,
  askGetDecrypted,
  askUpdate,
  askDelete,
  askTag,
} from "./input.js";
import {
  createSecret,
  getOneSecret,
  getAllSecrets,
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
          getAllSecrets(type, format, profile, region);
        });
        break;
      case "Get Decrypted Secret":
        askGetDecrypted().then((answers) => {
          const {
            secretName: secret,
            awsAccount: profile,
            awsRegion: region,
          } = answers;
          getOneSecret(secret, profile, region);
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
