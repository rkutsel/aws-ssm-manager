import AWS from "aws-sdk";

export function createSecret(
  secretname,
  secretvalue,
  profile,
  region,
  tags = null,
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
      `######################\n# NEW SECRET CREATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secretname}\n######################`
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
      `######################\n# SECRET DELETED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secretname}\n######################`
    );
  });
}
