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

# Keep sourcemaps (since you're using Sentry)
# Optional cleanup if needed:
# RUN find /app/build -name "*.map" -type f -delete

# ---- PRODUCTION STAGE ----
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
