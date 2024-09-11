import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class BGATurnNotificationBotLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, "BGATurnNotificationBotLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset("dist"),
      timeout: cdk.Duration.seconds(30),
      functionName: "BGATurnNotificationBotLambda",
      environment: {
        // Add any environment variables your function needs
      },
    });

    // const rule = new events.Rule(this, "ScheduleRule", {
    //   schedule: events.Schedule.rate(cdk.Duration.minutes(5)),
    // });

    // rule.addTarget(new targets.LambdaFunction(lambdaFunction));
  }
}
