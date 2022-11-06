### MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## TL;DR

```bash
npm install -G aws-ssm-manager
npx aws-ssm-manager
```
**OR**
```bash
git clone git@github.com:rkutsel/aws-ssm-manager.git
cd aws-ssm-manager
make init
```

## Description

Interactive, **CRUD-capible** CLI tool to manage your [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) secrets. It can **CREATE** new secrets, **READ**, **UPDATE**, **DELETE** existing ones. Additionally it can **Retrieve** a decrypted value and **SAVE** generated output to a `JSON` file. Found to be useful for offline storage or when used as a source of truth.    

It relies on [AWS CLI](https://aws.amazon.com/cli/) for Authentication and Authorization. The interactive menu has a few regions `["US-WEST-2", "US-EAST-1", "EU-WEST-1"]` that are there as an example. This can easily be extended by adding additional AWS regions to the **[config.js](https://github.com/rkutsel/aws-ssm-manager/blob/main/config.js)** file.

## Some Assumptions

1. You have installed and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) AWS CLI with profiles
2. You authenticated into AWS if you're using temporary tokens
3. Parameter Store Tier => Standard. Can be changed in **[config.js](https://github.com/rkutsel/aws-ssm-manager/blob/main/config.js)** file.
4. Override on creation => false. Can be changed in **[config.js](https://github.com/rkutsel/aws-ssm-manager/blob/main/config.js)** file.
5. Default directory path => "./output" Can be changed in **[config.js](https://github.com/rkutsel/aws-ssm-manager/blob/main/config.js)** file.

## External Dependencies

> `Node.JS >=14.16`

> `npm >=8.11.0`

> `aws-cli/2.5.0`

> `Python/3.9.11`

### Installing Local Dependencies

If you don't want to use it as an `NPM` package, you can do so by clonning the repo `git clone git@github.com:rkutsel/aws-ssm-manager.git` and install local dependencies by running `npm install` in your terminal. A successful installation should look somewhat similar to the one bellow:

```bash
added 104 packages, and audited 105 packages in 2s

60 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Usage

After the installation is complete, you should be able to run it. From the `root` directory run:

```bash
make start
```

OR

```bash
npm start
```

A successful run should start the interactive prompt with the initial question. Expected output:

```bash
➜ make start
node app.js
Starting the app...
? Choose action type:
  ====================== (Use arrow keys)
❯ Create New Secret
  Get All Secrets
  Update Existing Secret
  Delete Existing Secret
  Exit
```
