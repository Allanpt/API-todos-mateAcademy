
const { todoRoute } = require('./dist/routes/todo.route.js')

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use('/todos', todoRoute);

app.use('*', (_, res) => {
  res.status(404).json({
    status: '404 - NOT FOUND',
    message: 'Route not found',
  });
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

return app;