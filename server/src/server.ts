import express from 'express';
import cors from 'cors'
import routes from './route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

//Metodos HTTP:
//GET:Buscar ou listar uma informação
//POST: Criar alguma nova informação
//PUT: Atualizar uma informação existente
//DELETE: Deletar uma informação existente

// Corpo (Request Body): Dados para criação ou atualização de um registro
//Route Params (request.params): Identificar qual recurso eu quero atualizar ou deletar
//Query Params (request.query): Paginação, filtros, ordenação

app.get('/', (request, response) => {

    return response.json({ message: 'Hello world'})
})

app.listen(3333);
