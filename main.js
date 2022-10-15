import answerList from "./input.js";
import createSecret from "./sdk-ssm.js";

answerList().then((answers) => {
  const {
    awsAccount: account,
    awsRegion: region,
    secretName: secret,
    secretValue: value,
    tags: tags,
  } = answers;
  createSecret(secret, value, account, region, tags);
});
