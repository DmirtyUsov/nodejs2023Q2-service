FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
# Generate Prisma client
RUN npx prisma generate
# Push changes to DB
#RUN npx prisma db push
CMD [ "npm", "run", "start:dev"]