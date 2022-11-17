import AWS from "aws-sdk";
import init from "./main.js";
import { ssmConfigOptions } from "./config.js";
import { saveToFile } from "./parser.js";

export const ssmSdk = {
  createOne: (secret, value, profile, region, tags = null) => {
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
  },
  getDecrypted: (secret, profile, region) => {
    process.env.AWS_PROFILE = profile;
    const ssm = new AWS.SSM({ region: region });
    const params = {
      Name: secret,
      WithDecryption: true,
    };

    ssm.getParameter(params, function (err, data) {
      if (err) {
        console.log(
          `RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`
        );
      } else {
        console.log(
          `######################\n# DECRYPTED SECRET VALUE!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n# SECRETVALUE:${data.Parameter.Value}\n######################`
        );
        init();
      }
    });
  },
  getAll: (type, format, profile, region) => {
    process.env.AWS_PROFILE = profile;
    const fmt = ssmConfigOptions.format;
    let jsonObj = [];

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
        const paramsData = data.Parameters;
        if (err) {
          console.log(
            `RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`
          );
        } else {
          switch (format) {
            case fmt.json: {
              console.log(data.Parameters);
              break;
            }

            case fmt.text: {
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
              break;
            }

            case fmt.file: {
              data.NextToken
                ? paramsData.map((el) => {
                    jsonObj.push(el);
                  })
                : paramsData.map((el) => {
                    jsonObj.push(el);
                  }) && saveToFile(jsonObj, profile, region);
              break;
            }
          }

          if (data.NextToken) {
            params.NextToken = data.NextToken;
            _getRecursive();
          } else {
            console.log("\nCompleted! Choose Next Action Type Or Exit.\n");
            init();
          }
        }
      });
    }
    _getRecursive();
  },
  updateOne: (secret, value, profile, region) => {
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
  },
  deleteOne: (secret, profile, region) => {
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
  },
};
