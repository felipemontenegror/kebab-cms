const express = require('express')  //chamo express js
var cors = require ('cors') //precisa para o front bater na minha API (cor do projeto)
const connectDB = require('./config/db');
const app = express()
const PORT = process.env.port || 3000; // porta q vai rodar


// Init Middleware
app.use(cors())  //controle de protocolo de quem ta fazendo requisicão http

// Connect Database
connectDB()

app.get('/', (req, res) => res.send('Hello!'))  //rota de hello


app.listen(PORT, () => { console.log(`Rodando na porta ${PORT}`) }) //coloca servidor no ar na porta 