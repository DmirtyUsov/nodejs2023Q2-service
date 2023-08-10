FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
# Generate Prisma client
RUN chmod u+x ./docker-startservice.sh && npx prisma generate
#CMD [ "npm", "run", "start:dev"]
CMD ["ash", "./docker-startservice.sh"]