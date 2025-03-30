# Step 1: Build the React frontend
FROM node:20 as build

# Set working directory for the frontend build
WORKDIR /home/node/app
COPY client/ ./client/

# Install dependencies for frontend (React app)
WORKDIR /home/node/app/client
RUN npm install
RUN npm run build

# Step 2: Prepare backend (Express) and copy the necessary files
FROM node:20-alpine

# Set working directory for the backend
WORKDIR /app

# Copy the backend package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the backend source code (root folder)
COPY . .

# Copy the React build folder from the first image to the backend directory
COPY --from=build /home/node/app/client/build /app/client/build

# Expose the port your Express server will run on
EXPOSE 8080

# Start the backend server (assuming you serve the React app with Express)
CMD ["npm", "run", "server"]
