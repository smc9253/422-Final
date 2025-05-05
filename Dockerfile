# Dockerfile
FROM node:18-alpine

# 1. Set working dir
WORKDIR /usr/src/app

# 2. Copy package files & install deps
COPY package*.json ./
RUN npm ci --only=production

# 3. Copy the rest of your source
COPY . .

# 4. Default command
CMD ["node", "src/service.js"]
