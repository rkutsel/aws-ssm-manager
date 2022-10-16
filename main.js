import { initialQuestion, askCreate, askDelete, askTag } from "./input.js";
import { createSecret, deleteSecret } from "./sdk-ssm.js";

export default function init() {
  initialQuestion().then((answer) => {
    const { actionType: action } = answer;

    switch (action) {
      case "Create New Secret":
        askCreate().then((answers) => {
          const {
            awsAccount: profile,
            awsRegion: region,
            secretName: secret,
            secretValue: value,
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
      case "Delete Existing Secret":
        askDelete().then((answers) => {
          const {
            awsAccount: profile,
            awsRegion: region,
            secretName: secret,
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
