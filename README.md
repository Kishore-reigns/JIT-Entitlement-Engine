# JIT ENTITLEMENT MANAGEMENT SYSTEM

## Overview
The JIT Entitlement Management System is a cloud-native software access control platform that enables temporary, credit-based feature access for software products using a Just-In-Time (JIT) entitlement model. Instead of permanently assigning licenses or subscriptions, the system dynamically grants access to features for a limited duration and automatically revokes access when the session expires.

This project demonstrates how modern serverless architectures can be used to implement flexible software licensing models that improve cost efficiency, security, and user experience.

---

## Key Features
- User authentication (register and login)
- Multi-product support (SketchUp, Tekla)
- Credit-based entitlement system
- JIT session activation
- Automated lifecycle management
- Grace-period handling
- Dynamic UI feature rendering
- Email notification on session completion
- Audit logging
- CI/CD deployment with GitHub Actions

---

## Architecture
The system is implemented using a serverless AWS architecture:

Frontend:
- HTML
- CSS
- JavaScript
- Hosted on Amazon S3

Backend:
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Amazon EventBridge Scheduler
- Amazon SES

---

## Project Structure
# JIT ENTITLEMENT MANAGEMENT SYSTEM

## Overview
The JIT Entitlement Management System is a cloud-native software access control platform that enables temporary, credit-based feature access for software products using a Just-In-Time (JIT) entitlement model. Instead of permanently assigning licenses or subscriptions, the system dynamically grants access to features for a limited duration and automatically revokes access when the session expires.

This project demonstrates how modern serverless architectures can be used to implement flexible software licensing models that improve cost efficiency, security, and user experience.

---

## Key Features
- User authentication (register and login)
- Multi-product support (SketchUp, Tekla)
- Credit-based entitlement system
- JIT session activation
- Automated lifecycle management
- Grace-period handling
- Dynamic UI feature rendering
- Email notification on session completion
- Audit logging
- CI/CD deployment with GitHub Actions

---

## Architecture
The system is implemented using a serverless AWS architecture:

Frontend:
- HTML
- CSS
- JavaScript
- Hosted on Amazon S3

Backend:
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Amazon EventBridge Scheduler
- Amazon SES


---

## DynamoDB Tables
- Users
- Products
- Entitlements
- JITSubscriptionPlans
- JIT_Entitlement
- JIT_auditLog

---

## Main APIs

POST /auth/register
POST /auth/login
GET /user/profile
GET /catalog/products
GET /catalog/plans
POST /jit/request-upgrade
GET /jit/status


---

## JIT Lifecycle
A JIT session progresses through the following stages:

ACTIVE → WARN_50 → WARN_90 → COMPLETE → GRACE → EXPIRED

EventBridge Scheduler automatically triggers lifecycle updates using the LifeCycleLambda function.

---

## Testing Strategy
The system was tested using:
- API testing via Postman
- UI testing
- Lifecycle event simulation
- Credit validation tests
- Plan validation tests
- Error handling scenarios
- Scheduler trigger verification

Both positive and negative test cases were executed to ensure system reliability.

---

## CI/CD Deployment
Frontend deployment is automated using GitHub Actions.  
Whenever changes are pushed to the main branch, the workflow syncs the frontend files to the S3 hosting bucket.

---

## Demo
[(Demo Video Link)](https://drive.google.com/file/d/1rfNBYcIrr6judr5Q7EdX7FhMKBVqEey4/view?usp=drive_link)

---

## You can further contribute to this project by creating a new feature-branch and making a pull request. Mail the demo video to [malarvannanm11@gmail.com] for merging

---

## Author
Malarvannan
Software Engineer at Trimble


