import AWS from "aws-sdk";

export default function createSecret(
  secretname,
  secretvalue,
  profile,
  region,
  tags,
  override = false
) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const config = {
    Name: secretname,
    Value: secretvalue,
    Type: "SecureString",
    Overwrite: override,
    Tags: JSON.parse(tags),
  };

  ssm.putParameter(config, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    }
    console.log(
      `######################\nSecret created!\nprofile: ${profile}\nregion: ${region}\nsecretname: ${secretname}\n######################`
    );
  });
}
