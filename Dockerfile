# Use the official Node.js runtime as the base image
FROM node:22 as build
# ENV NODE_ENV production

##ARG REACT_APP_ENV
##ENV REACT_APP_ENV qa

# Define build arguments for environment variables
ARG REACT_APP_ENV
ARG SENTRY_AUTH_TOKEN
ARG GENERATE_SOURCEMAP

ENV REACT_APP_ENV $REACT_APP_ENV
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP

# ✅ Set memory limit BEFORE any npm commands
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build
RUN find /app/build -name "*.map" -type f -delete

# Use Nginx as the production server
FROM nginx:stable-alpine

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf


# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
