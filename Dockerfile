# Use an official Node.js runtime as a parent image
FROM node:20 as build

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install
RUN ls -l /home/node/app
COPY . .
RUN npm run build

# Build the container image
FROM node:20-alpine
WORKDIR /app
COPY --from=build /home/node/app/dist/ /app/dist
COPY --from=build /home/node/app/node_modules /app/node_modules

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["node", "/app/dist/server.js"]