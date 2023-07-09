FROM node:18-alpine as build

# Add build argument for API URL
ARG VITE_APP_API_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Use build argument as environment variable
RUN VITE_APP_API_URL=$VITE_APP_API_URL npm run build

FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
