import * as cdk from "aws-cdk-lib";
import {
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
  IpAddresses
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class InfraStack extends cdk.Stack {
  private readonly PROJECT_NAME = "hello-world-app";
  private readonly BACKEND_PORT = 8080;
  private readonly FRONTEND_PORT = 80;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = this.createVpc();
    const sg = this.createSgForALB(vpc);

    this.createOutputs(vpc, sg);
  }

  createVpc = (): Vpc => {
    const vpcName = `${this.PROJECT_NAME}-vpc`;
    return new Vpc(this, vpcName, {
      vpcName: vpcName,
      ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: `${this.PROJECT_NAME}-private`,
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
        {
          cidrMask: 24,
          name: `${this.PROJECT_NAME}-public`,
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });
  };

  createSgForALB = (vpc: Vpc): SecurityGroup => {
    const sgName = `${this.PROJECT_NAME}-sg-for-alb`;

    const sg = new SecurityGroup(this, sgName, {
      vpc: vpc,
      description: "Allow inbound traffic from ALB on ports 80 and 8080",
      allowAllOutbound: true,
      securityGroupName: sgName,
    });

    sg.addIngressRule(Peer.anyIpv4(), Port.tcp(this.FRONTEND_PORT));
    sg.addIngressRule(Peer.anyIpv4(), Port.tcp(this.BACKEND_PORT));

    return sg;
  };

  createOutputs = (vpc: Vpc, sg: SecurityGroup) => {
    new cdk.CfnOutput(this, "vpcId", {
      description: "The id of the Vpc",
      value: vpc.vpcId,
    });

    new cdk.CfnOutput(this, "sgId(sg-for-alb)", {
      description: "The id of the Security Group",
      value: sg.securityGroupId,
    });
  };
}
