import AWS from "aws-sdk";

export function createSecret(
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
      `######################\n# Secret created!\n# profile: ${profile}\n# region: ${region}\n# secretname: ${secretname}\n######################`
    );
  });
}

export function deleteSecret(secretname, profile, region) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const params = {
    Name: secretname,
  };

  ssm.deleteParameter(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    }
    console.log(
      `######################\n# Secret deleted!\n# profile: ${profile}\n# region: ${region}\n# secretname: ${secretname}\n######################`
    );
  });
}
