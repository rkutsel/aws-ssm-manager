#! /usr/bin/env node
import init from "./main.js";
import { ssmConfigOptions } from "./config.js";

ssmConfigOptions.greeting;
console.log("Starting the app...");
init();
