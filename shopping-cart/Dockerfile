FROM node

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Expose the application port
EXPOSE 3000

# Start the application with nodemon for hot-reloading
CMD ["npm", "run", "dev"]
