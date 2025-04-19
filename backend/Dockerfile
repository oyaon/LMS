FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install jest @shelf/jest-mongodb --save-dev

# Copy the rest of the application code
COPY . .

# Set the default command to run tests
CMD ["npm", "test"]