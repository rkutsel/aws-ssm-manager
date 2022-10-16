import AWS from "aws-sdk";
import init from "./main.js";

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
    if (data) {
      console.log(
        data,
        typeof data,
        `######################\n# NEW SECRET CREATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secretname}\n######################`
      );
    }
    if (err) {
      console.log(
        `RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`
      );
    }
    init();
  });
}

export function deleteSecret(secretname, profile, region) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const params = {
    Name: secretname,
  };

  ssm.deleteParameter(params, (err, data) => {
    if (data) {
      console.log(
        data,
        typeof data,
        `######################\n# NEW SECRET CREATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secretname}\n######################`
      );
    }
    if (err) {
      console.log(
        `RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`
      );
    }
    init();
  });
}
