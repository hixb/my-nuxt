FROM node:21.6.1
MAINTAINER hixb
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 3000
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build
CMD ["yarn",  "start"]
