FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
# RUN npm ci
COPY . .
# Generate Prisma client
RUN chmod u+x ./docker-startservice.sh && npx prisma generate
#CMD [ "npm", "run", "start:dev"]
CMD ["ash", "./docker-startservice.sh"]