# Deployment Checklist for Fullstack App on EC2

| Task                                      | Done |
| ----------------------------------------- | ----- |
| EC2 instance created                      | ✅     |
| S3 bucket created and configured          | ✅     |
| Setting up your application server             | ✅     |
| MongoDB database and user created         | ✅     |
| Backend app running on port 3000          | ✅     |
| Frontend served via Nginx | ✅     |



## Launch EC2 Instance
Launch an EC2 Instance

## S3 bucket created and configured
1. Create a S3 bucket
2. Contact your administrator to get access_id & access_key
## Setting Up Your Application Server
1. Connect to your EC2 instance
```bash
ssh -i /path/key.pem ubuntu@ec2-ip
```
2. Install System package
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential git curl nginx vim
```
3. Install NodeJS and PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v
sudo npm install -g pm2
```
4. Install MongoDB
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt update
sudo apt install -y mongodb-org

sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```
# MongoDB database and user created

1. Access to mongodb shell
```bash
mongosh
```
2. Create and switch to new database
```bash
use myappdb
```
3. Create a new database user
```bash
db.createUser({
  user: "myappuser",
  pwd: "securepassword",
  roles: [ { role: "readWrite", db: "myappdb" } ]
})
```
4. Exit from mongodb shell
```bash
exit
```
5. Use the connection string for your app
```bash
MONGO_URI=mongodb://myappuser:securepassword@localhost:27017/myappdb?authSource=digistar
```
# Create and run backend App
```bash
mkdir -p ~/apps
cd ~/apps
git clone <your-backend-repo>
mv ~/apps/repo/backend ~/apps
nano .env    # Add env
npm install
pm2 start src/index.js --name backend --watch --env production
pm2 save
```
.env file
```bash
MONGO_URI=db-uri
S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-id
AWS_SECRET_ACCESS_KEY=your-access-key
AWS_REGION=aws-region
```
# Create and run frontend App
1. Build fronted app
```bash
cd ~/apps
git clone <your-backend-repo>
mv ~/apps/repo/frontend ~/apps
nano .env    # Add env
npm install
npm run build
```
.env file
```bash
VITE_API_BASE_URL=api-url
```
2. Server via nginx
```bash
sudo mkdir -p /var/www/frontend
sudo cp -r dist/* /var/www/frontend/
```
```bash
# replace new build
sudo rm -rf /var/www/frontend/*
```
3. edit nginx config
```bash
sudo vim /etc/nginx/sites-available/default
```

```bash
server {
    listen 80;
    server_name your-ipv4;

    root /var/www/frontend;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
