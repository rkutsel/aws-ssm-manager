import { initialQuestion, createQuestions, deleteQuestions } from "./input.js";
import { createSecret, deleteSecret } from "./sdk-ssm.js";

initialQuestion().then((answer) => {
  const { actionType: action } = answer;

  switch (action) {
    case "Create New Secret":
      createQuestions().then((answers) => {
        const {
          awsAccount: profile,
          awsRegion: region,
          secretName: secret,
          secretValue: value,
          tags: tags,
        } = answers;
        createSecret(secret, value, profile, region, tags);
      });
      break;
    case "Delete Existing Secret":
      deleteQuestions().then((answers) => {
        const {
          awsAccount: profile,
          awsRegion: region,
          secretName: secret,
        } = answers;
        deleteSecret(secret, profile, region);
      });
      break;
  }
});
