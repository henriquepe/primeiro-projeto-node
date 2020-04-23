import express from 'express';
import routes from './routes';
import './database';
import 'reflect-metadata';

const app = express();

// entende agora requisicoes JSON
app.use(express.json());

// routes esta sendo usado como um middleware, o use chama a requisicao do arquivo index.ts
// com o metodo express Router na constante routes.
// la: routes.get('/', (request, response) => response.json({ message: 'Hello GoStack' }));
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
