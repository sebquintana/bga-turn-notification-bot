#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BGATurnNotificationBotLambdaStack } from "../cdk/bga-turn-notification-bot-lambda-stack";

const app = new cdk.App();
new BGATurnNotificationBotLambdaStack(app, "BGATurnNotificationBotStack");

