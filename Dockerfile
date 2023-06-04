FROM node:14.21.0-alpine

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN yarn

# Copy rest of the code to container
COPY . .

EXPOSE 3001

# Run the API on Nodemon
CMD ["yarn","start"]