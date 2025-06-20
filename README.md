# AWS Services by Category (2024)

## 🖥️ Compute
| Service | Description |
|---------|-------------|
| **Amazon EC2** | Virtual servers in the cloud |
| **AWS Lambda** | Serverless compute |
| **Amazon ECS** | Container orchestration using EC2 |
| **Amazon EKS** | Kubernetes service |
| **AWS Fargate** | Serverless containers |
| **Amazon Lightsail** | Simplified VPS for small workloads |
| **Elastic Beanstalk** | Platform-as-a-Service (PaaS) |
| **AWS Batch** | Batch computing jobs |
| **AWS Outposts** | Run AWS on-premises |
| **AWS Local Zones** | Low-latency compute closer to users |
| **AWS App Runner** | Deploy web apps directly from source code or containers |

## 💾 Storage
| Service | Description |
|---------|-------------|
| **Amazon S3** | Object storage |
| **Amazon EBS** | Block storage for EC2 |
| **Amazon EFS** | Scalable file system |
| **AWS Backup** | Centralized backup |
| **Amazon FSx** | Managed Windows/Lustre file systems |
| **Amazon Glacier / S3 Glacier** | Archival storage |
| **AWS Storage Gateway** | Hybrid cloud storage integration |

## 🛢️ Database
| Service | Description |
|---------|-------------|
| **Amazon RDS** | Managed relational databases |
| **Amazon Aurora** | High-performance RDS engine |
| **Amazon DynamoDB** | NoSQL key-value store |
| **Amazon ElastiCache** | In-memory cache (Redis/Memcached) |
| **Amazon Redshift** | Data warehouse |
| **Amazon Neptune** | Graph database |
| **Amazon DocumentDB** | Managed document DB (MongoDB-compatible) |
| **Amazon Timestream** | Time-series database |
| **Amazon Keyspaces** | Managed Cassandra service |

## 🌐 Networking & Content Delivery
| Service | Description |
|---------|-------------|
| **Amazon VPC** | Virtual private cloud |
| **Elastic Load Balancing (ELB)** | Distribute traffic |
| **Amazon Route 53** | DNS & domain service |
| **AWS CloudFront** | CDN |
| **AWS Global Accelerator** | Improve app performance |
| **AWS Direct Connect** | Private network to AWS |
| **AWS PrivateLink** | Secure access to services |
| **AWS Transit Gateway** | Central hub for network routing |

## 🔐 Security, Identity & Compliance
| Service | Description |
|---------|-------------|
| **AWS IAM** | Identity and Access Management |
| **AWS KMS** | Key Management Service |
| **AWS Shield** | DDoS protection |
| **AWS WAF** | Web Application Firewall |
| **AWS Secrets Manager** | Store and manage secrets |
| **AWS Organizations** | Multi-account governance |
| **Amazon Cognito** | User sign-up, sign-in, and auth |
| **AWS Artifact** | Compliance reports |
| **Amazon GuardDuty** | Threat detection |
| **AWS Security Hub** | Security visibility |
| **AWS Config** | Resource configuration tracking |
| **AWS Macie** | Data loss prevention (DLP) for S3 |

## 🔄 Application Integration
| Service | Description |
|---------|-------------|
| **Amazon SQS** | Message queues |
| **Amazon SNS** | Push notification service |
| **Amazon EventBridge** | Event bus for app integration |
| **AWS Step Functions** | Serverless workflow automation |
| **Amazon MQ** | Managed message broker (RabbitMQ/ActiveMQ) |
| **AWS AppSync** | GraphQL API service |

## 🛠️ Developer Tools
| Service | Description |
|---------|-------------|
| **AWS CodeCommit** | Git repository |
| **AWS CodeBuild** | Build service |
| **AWS CodeDeploy** | Deploy applications |
| **AWS CodePipeline** | CI/CD orchestration |
| **AWS Cloud9** | Cloud IDE |
| **AWS X-Ray** | App debugging and tracing |

## 📈 Monitoring & Management
| Service | Description |
|---------|-------------|
| **Amazon CloudWatch** | Monitoring and observability |
| **AWS CloudTrail** | API call logging |
| **AWS Config** | Configuration tracking |
| **AWS Trusted Advisor** | Best practices and recommendations |
| **AWS Systems Manager** | OpsHub for managing AWS resources |

## 🧠 Machine Learning & AI
| Service | Description |
|---------|-------------|
| **Amazon SageMaker** | Build/train/deploy ML models |
| **Amazon Rekognition** | Image & video analysis |
| **Amazon Polly** | Text-to-speech |
| **Amazon Comprehend** | Natural language processing |
| **Amazon Transcribe** | Speech to text |
| **Amazon Translate** | Language translation |
| **Amazon Bedrock** | Foundation model APIs |
| **Amazon Textract** | OCR document analysis |
| **Amazon Forecast** | Time-series forecasting |
| **Amazon Personalize** | Recommendation engine |

## 📊 Analytics & Big Data
| Service | Description |
|---------|-------------|
| **Amazon Athena** | Query data in S3 using SQL |
| **Amazon EMR** | Managed Hadoop/Spark clusters |
| **Amazon Kinesis** | Real-time data streaming |
| **AWS Glue** | ETL service |
| **Amazon OpenSearch** | Search & analytics engine |
| **Amazon QuickSight** | Business intelligence (BI) |
| **AWS Data Pipeline** | Data movement & transformation |

## 🧬 Migration & Transfer
| Service | Description |
|---------|-------------|
| **AWS Migration Hub** | Central migration dashboard |
| **AWS DMS (Database Migration Service)** | DB migration |
| **AWS Snow Family** | Physical data transfer devices |
| **AWS Transfer Family** | SFTP/FTP into S3 |
| **AWS Application Migration Service** | Lift-and-shift migrations |

## 💼 Business Applications
| Service | Description |
|---------|-------------|
| **Amazon WorkSpaces** | Virtual desktops |
| **Amazon Chime** | Video conferencing |
| **Amazon Connect** | Call center solution |
| **AWS WorkDocs** | Document collaboration |

---

# AWS Services Grouped by Cloud Service Model (IaaS, PaaS, SaaS)

## ☁️ Infrastructure as a Service (IaaS)
These services provide virtualized infrastructure resources like compute, storage, and networking.

| Service | Description |
|---------|-------------|
| **Amazon EC2** | Virtual machines |
| **Amazon VPC** | Virtual Private Cloud for networking |
| **Amazon EBS** | Block storage for EC2 |
| **Amazon S3** | Object storage (used in both IaaS & PaaS) |
| **Elastic Load Balancing (ELB)** | Distribute traffic across EC2 instances |
| **AWS Direct Connect** | Dedicated network connection to AWS |
| **AWS Outposts** | Run AWS services on-premises |
| **Amazon Route 53** | DNS and domain name service |

---

## 🚀 Platform as a Service (PaaS)
These services provide a platform to develop, run, and manage applications without managing the infrastructure.

| Service | Description |
|---------|-------------|
| **AWS Lambda** | Serverless function execution |
| **AWS Fargate** | Serverless container hosting |
| **Elastic Beanstalk** | Platform for deploying apps |
| **Amazon RDS** | Managed relational database |
| **Amazon DynamoDB** | NoSQL database |
| **Amazon EKS** | Managed Kubernetes |
| **Amazon ECS** | Container orchestration |
| **AWS App Runner** | Build and deploy containerized web apps |
| **AWS Glue** | ETL service |
| **Amazon MQ** | Managed message broker |
| **Amazon SQS / SNS** | Messaging services |
| **AWS Step Functions** | Serverless workflow management |
| **Amazon SageMaker** | ML model building & deployment |
| **AWS CodeBuild / CodeDeploy / CodePipeline** | CI/CD services |

---

## 🧩 Software as a Service (SaaS)
These are complete applications delivered as a service over the internet.

| Service | Description |
|---------|-------------|
| **Amazon Chime** | Video conferencing |
| **Amazon WorkSpaces** | Virtual desktop as a service |
| **Amazon WorkDocs** | Document collaboration |
| **Amazon Connect** | Cloud-based contact center |
| **AWS IQ** | Hire AWS-certified freelancers |
| **AWS Managed Services** | Fully managed infrastructure operations |

---

## 📝 Notes
- Some services can fit into more than one model depending on usage.
- SaaS often refers to business-level applications with direct end-user interfaces.
- PaaS simplifies deployment; IaaS gives more control.
