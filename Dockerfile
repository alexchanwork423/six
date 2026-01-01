# 1. Base image
FROM node:20

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files first
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the project
COPY . .

# 6. Expose port
EXPOSE 3000

# 7. Start the app
CMD ["npm", "run", "dev"]
