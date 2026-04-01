# ---- BUILD STAGE ----
  FROM node:20 AS build

  ARG REACT_APP_ENV
  ARG SENTRY_AUTH_TOKEN
  ARG GENERATE_SOURCEMAP
  
  ENV REACT_APP_ENV=$REACT_APP_ENV
  ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
  ENV GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP
  
  # 🔥 Increased memory (main fix)
  ENV NODE_OPTIONS="--max-old-space-size=6144"
  
  WORKDIR /app
  
  COPY package*.json ./
  
  RUN npm install --legacy-peer-deps
  
  COPY . .
  
  # Force memory again at build time (extra safety)
  RUN NODE_OPTIONS="--max-old-space-size=6144" npm run build
  
  RUN find /app/build -name "*.map" -type f -delete
  # ---- PRODUCTION STAGE ----
  # Use Alpine as the production base so nginx + brotli come from the same frozen repo
# Alpine 3.21 package index is stable — no version drift between nginx and brotli
  FROM alpine:3.21

  # Install nginx and brotli module together from the same repo index
  RUN apk add --no-cache nginx nginx-mod-http-brotli
  
  COPY --from=build /app/build /usr/share/nginx/html
  COPY nginx.conf /etc/nginx/nginx.conf
  
  EXPOSE 80
  
  CMD ["nginx", "-g", "daemon off;"]