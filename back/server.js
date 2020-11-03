const express = require('express')  //chamo express js
var bodyParser = require('body-parser')
var cors = require ('cors') //precisa para o front bater na minha API (cor do projeto)
const connectDB = require('./config/db');
const fileupload = require('./config/db');
const fileUpload = require('express-fileupload');
const app = express()
const PORT = process.env.port || 3000; // porta q vai rodar


// Init Middleware
app.use(cors());  //controle de protocolo de quem ta fazendo requisicão http
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')) //sobe arquivo para o servidor 

// Connect Database
connectDB()

app.use(fileUpload({
    createParentPath: true
}))

app.get('/', (req, res) => res.send('Hello!'))  //rota de hello
app.use('/auth', require('./routes/api/auth'))
app.use('/banner', require('./routes/api/banner'))
app.use('/category', require('./routes/api/category'))
app.use('/content', require('./routes/api/content'))
app.use('/infos', require('./routes/api/info'))
app.use('/product', require('./routes/api/product'))
app.use('/services', require('./routes/api/service'))
app.use('/user', require('./routes/api/user'))

app.listen(PORT, () => { console.log(`Rodando na porta ${PORT}`) }) //coloca servidor no ar na porta 