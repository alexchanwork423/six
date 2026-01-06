FROM node:20-alpine

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# generate prisma client
RUN npx prisma generate

# build nest app
RUN npm run build

EXPOSE 4000

# run compiled app
CMD ["node", "dist/main.js"]

