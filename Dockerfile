# 1. Use Node.js base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy project files
COPY . .

# 4. Install dependencies
RUN npm install

# 5. Build the app for web
RUN npm run web-build || npm run build

# 6. Serve it using a lightweight web server
RUN npm install -g serve

# 7. Expose the default port
EXPOSE 3000

# 8. Start the web server
CMD ["serve", "-s", "web-build"]
