import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class BGATurnNotificationBotLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const chromiumLayer = cdk.aws_lambda.LayerVersion.fromLayerVersionArn(
      this,
      "ChromiumLayer",
      "arn:aws:lambda:us-east-1:590183826128:layer:chromium:2"
    );

    new NodejsFunction(this, "BGATurnNotificationBotLambda", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      entry: "src/lambda/index.ts",
      functionName: "BGATurnNotificationBotLambda",
      memorySize: 3008,
      layers: [chromiumLayer],
      timeout: cdk.Duration.seconds(120),
      environment: {
        HOME: "/tmp",
        FONTCONFIG_PATH: "/tmp/fonts",
        FONTCONFIG_FILE: "/tmp/fonts/fonts.conf",
      },
      bundling: {
        externalModules: ["puppeteer"],
        nodeModules: ["@sparticuz/chromium-min", "puppeteer-core"],
        commandHooks: {
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [];
          },
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/.env ${outputDir}/.env`];
          },
          beforeInstall() {
            return [];
          },
        },
      },
    });

    // const rule = new events.Rule(this, "ScheduleRule", {
    //   schedule: events.Schedule.rate(cdk.Duration.minutes(5)),
    // });

    // rule.addTarget(new targets.LambdaFunction(lambdaFunction));
  }
}
