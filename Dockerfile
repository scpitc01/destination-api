# Use a base image with Node.js pre-installed
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies using npm ci
RUN npm ci --only=production

# Copy the rest of the application files to the working directory
COPY . .

# Compile TypeScript files
RUN npm install typescript
RUN npm run build

# Expose the port where the application will run (if applicable)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]  # Adjust the entry point based on your setup