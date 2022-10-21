import AWS from "aws-sdk";
import init from "./main.js";
import { ssmConfigOptions } from "./config.js";

export function createSecret(
  secretname,
  secretvalue,
  profile,
  region,
  tags = null
) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const config = {
    Name: secretname,
    Value: secretvalue,
    Type: "SecureString",
    Overwrite: ssmConfigOptions.override,
    Tags: JSON.parse(tags),
    Tier: ssmConfigOptions.tier,
  };

  ssm.putParameter(config, (err, data) => {
    if (data) {
      console.log(
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

export function getSecrets(type, format, profile, region) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });
  const params = {
    ParameterFilters: [
      {
        Values: [type],
        Key: "Type",
      },
    ],
    MaxResults: 50,
    NextToken: undefined,
  };

  function _getRecursive() {
    ssm.describeParameters(params, (err, data) => {
      if (err) {
        console.log(
          `RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`
        );
      } else {
        format === "JSON"
          ? console.log(data.Parameters)
          : data.Parameters.map((el) =>
              console.log(
                `Secret Name: ${el.Name}\nLast Modified: ${
                  el.LastModifiedDate
                }\nLast Modified By: ${
                  el.LastModifiedUser.split("/")[
                    el.LastModifiedUser.split("/").length - 1
                  ]
                }\n`
              )
            );
        if (data.NextToken) {
          params.NextToken = data.NextToken;
          _getRecursive();
        }
      }
    });
  }
  _getRecursive();
}

export function updateSecret(secretname, secretvalue, profile, region) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const config = {
    Name: secretname,
    Value: secretvalue,
    Type: "SecureString",
    Overwrite: true,
    Tier: ssmConfigOptions.tier,
  };

  ssm.getParameter({ Name: secretname }, function (err, data) {
    if (err) {
      console.log(
        `RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`
      );
      init();
    } else {
      ssm.putParameter(config, (err, data) => {
        if (data) {
          console.log(
            `######################\n# SECRET VALUE UPDATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secretname}\n######################`
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
        `######################\n# SECRET DELETED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secretname}\n######################`
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
