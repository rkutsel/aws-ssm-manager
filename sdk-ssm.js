import { SSM } from "@aws-sdk/client-ssm";
import init from "./main.js";
import { ssmConfigOptions } from "./config.js";
import { saveToFile } from "./parser.js";
import gradient from "gradient-string";

export const ssmSdk = {
	createOne: (secret, value, profile, region, tags = null) => {
		process.env.AWS_PROFILE = profile;

		const ssm = new SSM({ region: region });

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
					gradient.cristal(
						`######################\n# NEW SECRET CREATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n# TIMESTAMP: ${ssmConfigOptions.timestamp}\n######################`,
					),
				);
			}
			if (err) {
				console.log(
					`RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`,
				);
			}
			init();
		});
	},
	getDecrypted: (secret, profile, region) => {
		process.env.AWS_PROFILE = profile;
		const ssm = new SSM({ region: region });
		const params = {
			Name: secret,
			WithDecryption: true,
		};

		ssm.getParameter(params, function (err, data) {
			if (err) {
				console.log(
					`RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`,
				);
			} else {
				console.log(
					"##########################\n# DECRYPTED SECRET VALUE! #\n##########################",
					`\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n# SECRETVALUE:${data.Parameter.Value}`,
					`\n# LAST MODIFIED: ${data.Parameter.LastModifiedDate}\n# CURRENT VERSION: ${data.Parameter.Version}\n#########################`,
				);
				init();
			}
		});
	},
	getAll: (type, format, profile, region) => {
		process.env.AWS_PROFILE = profile;
		const fmt = ssmConfigOptions.format;
		const jsonObj = [];

		const ssm = new SSM({ region: region });
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
						`RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`,
					);
				} else {
					const paramsData = data.Parameters;

					switch (format) {
						case fmt.json: {
							console.log(data.Parameters);
							break;
						}

						case fmt.text: {
							data.Parameters.map((el) =>
								console.log(
									gradient.summer(
										`Secret Name: ${el.Name}\nLast Modified: ${
											el.LastModifiedDate
										}\nLast Modified By: ${
											el.LastModifiedUser.split("/")[
												el.LastModifiedUser.split("/").length - 1
											]
										}\n`,
									),
								),
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

		const ssm = new SSM({ region: region });

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
					`RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`,
				);
				init();
			} else {
				ssm.putParameter(config, (err, data) => {
					if (data) {
						console.log(
							gradient.summer(
								`######################\n# SECRET VALUE UPDATED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n######################`,
							),
						);
					}
					if (err) {
						console.log(
							`RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`,
						);
					}
					init();
				});
			}
		});
	},
	deleteOne: (secret, profile, region) => {
		process.env.AWS_PROFILE = profile;

		const ssm = new SSM({ region: region });

		const params = {
			Name: secret,
		};

		ssm.deleteParameter(params, (err, data) => {
			if (data) {
				console.log(
					gradient.instagram(
						`######################\n# SECRET DELETED!\n# PROFILE: ${profile}\n# REGION: ${region}\n# SECRETNAME: ${secret}\n######################`,
					),
				);
			}
			if (err) {
				console.log(
					`RUNTIME ERROR!\n MESSAGE: ${err.message}\n, CODE: ${err.code}\n, TIME: ${err.time}\n`,
				);
			}
			init();
		});
	},
};
