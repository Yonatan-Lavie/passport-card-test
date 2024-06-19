FROM node

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Run the migration and seed commands, then start the application with nodemon for hot-reloading
CMD npx prisma migrate dev --name init && npx prisma migrate deploy && npm run prisma:seed && npm run dev