const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!');
    }).catch((erro) => {
        console.log(erro);
    })

app.use('/', categoriesController) // Pode ser também usado algum prefixo, como pode ser visto no linha de baixo 
app.use('/controller', articlesController)

app.get('/', (req, res) => {
    res.render('index');
});


app.listen(8000, () => {
    console.log('O Servidor está rodando!');
});