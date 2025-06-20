# 🗂️ Backend File Upload API

A modular backend application built with **Express**, **Mongoose**, **MongoDB**, and **AWS S3**, structured using **Clean Architecture** principles. This service handles file uploads, metadata storage, and serves file-related APIs.


---

## 🚀 Features

- ✅ File upload to **AWS S3**
- 🧾 Store file metadata in **MongoDB**
- 🧼 Clean Architecture (entities, usecases, interfaces, infra)
- 🔍 Healthcheck and media endpoints

---

## ⚙️ Installation

### Prerequisites

- Node.js ≥ 18
- MongoDB instance
- AWS account with an S3 bucket

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/backend-file-upload.git
cd backend-file-upload

# Install dependencies
npm install

# Create a .env file
cp .env.example .env

# run app
npm run dev
```
---

## 🔧 Environment Variables
Create a .env file with the following keys:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
AWS_BUCKET_NAME=your-bucket
```
