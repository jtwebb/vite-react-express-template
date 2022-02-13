const app = require('./server');

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
