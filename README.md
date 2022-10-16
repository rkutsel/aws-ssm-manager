### MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## TL;DR
```bash
echo '>>>CLONING THE REPO...\n'
git clone git@github.com:rkutsel/aws-ssm-manager.git
cd aws-ssm-manager
echo '>>>INSTALLING LOCAL DEPENDENCIES...\n'
npm i 
echo '############!INITIALIZING!############\n'
echo '!!!!!!!!!!MAKE SURE to HAVE:!!!!!!!!!!\n'
echo '#1.Node.JS, aws cli, python installed#\n'
echo '#2.Have your aws profiles configured #\n'
echo '#3.Authenticated into AWS            #\n'
echo '############!INITIALIZING!############\n'
npm start
```

## Description

A simple interactive CLI tool that manages your [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) secrets. At the moment it can **CREATE** new secrets and **DELETE** existing ones with a plan to make it **CRUD** capable in the near future. It relies on [AWS CLI](https://aws.amazon.com/cli/). The interactive menu has a few regions `["US-WEST-2", "US-EAST-1", "EU-WEST-1"]` that are there as an example. This can easily be extended by adding additional AWS regions to the **[config.js](https://github.com/rkutsel/aws-ssm-manager/blob/main/config.js)** file.

## Some Assumptions

1. You have installed and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) AWS CLI with profiles
2. You authenticated into AWS if you're using temporary tokens

## Dependencies

> `Node.JS >=14.16`

> `npm >=8.11.0`

> `aws-cli/2.5.0`

> `Python/3.9.11`

`` NOTE: You can quickly check this by running `node -v` for Node.JS and `npm -v` for NPM in your terminal. ``

### Installing Local Dependencies

Clone the repo `git clone git@github.com:rkutsel/aws-ssm-manager.git` and install local dependencies by running `npm install` in your terminal. A successful installation should look somewhat similar to the one bellow:

```bash
added 104 packages, and audited 105 packages in 2s

60 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Usage

From the `root` directory run `npm start` which should start the interactive prompt with the first question.
