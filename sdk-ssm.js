import AWS from "aws-sdk";
import init from "./main.js";
import { ssmConfigOptions } from "./config.js";
import { saveToFile } from "./parser.js";

export function createSecret(secret, value, profile, region, tags = null) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const config = {
    Name: secret,
    Value: value,
    Type: "SecureString",
    Overwrite: ssmConfigOptions.override,
    Tags: JSON.parse(tags),
    Tier: ssmConfigOptions.tier,
  };

  ssm.putParameter(config, (err, data) => {
    if (data) {
      console.log(
        `######################\n# NEW SECRET CREATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n######################`
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
  const fmt = ssmConfigOptions.format;

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
        if (format === fmt.json) {
          console.log(data.Parameters);
        }
        if (format === fmt.text) {
          data.Parameters.map((el) =>
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
        }
        if (format === fmt.file) {
          const params = data.Parameters;
          // const filename = `${profile}-${region}`
          saveToFile(params, profile, region);
        }
        if (data.NextToken) {
          params.NextToken = data.NextToken;
          _getRecursive(data.Parameters);
        }
      }
    });
  }
  _getRecursive();
}

export function updateSecret(secret, value, profile, region) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const config = {
    Name: secret,
    Value: value,
    Type: "SecureString",
    Overwrite: true,
    Tier: ssmConfigOptions.tier,
  };

  ssm.getParameter({ Name: secret }, function (err, data) {
    if (err) {
      console.log(
        `RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`
      );
      init();
    } else {
      ssm.putParameter(config, (err, data) => {
        if (data) {
          console.log(
            `######################\n# SECRET VALUE UPDATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n######################`
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

export function deleteSecret(secret, profile, region) {
  process.env.AWS_PROFILE = profile;

  const ssm = new AWS.SSM({ region: region });

  const params = {
    Name: secret,
  };

  ssm.deleteParameter(params, (err, data) => {
    if (data) {
      console.log(
        `######################\n# SECRET DELETED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n######################`
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
