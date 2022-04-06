const http = require('http');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const routes = require('./routes');
const cors = require('cors');

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes); // Route 에 의존성을 가집니다.

app.get('/', (req, res) => {
  res.json({ message: '/ hi' });
});

const server = http.createServer(app);

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    server.listen(process.env.PORT, () =>
      console.log(`Server is listening on ${process.env.PORT}`)
    );
  } catch (err) {
    console.error(err);
    //    await prisma.$disconnect() // 에러가 발생했을 시에 database 연결을 종료합니다.
  }
};

start();
