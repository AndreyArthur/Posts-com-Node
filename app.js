const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const {setup} = require('./models/db');
const Post = require('./models/Post');

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    Post.findAll({order: [['id', 'DESC']]}).then( function(posts) {
        res.render('home', {
            posts: posts,
        });
    });
});

app.get('/cad', function(req, res) {
    res.render('formulario');
});

app.post('/add', function(req, res) {
    Post.create({
        title: req.body.title,
        content: req.body.content,
    }).then( function() {
        res.redirect('/');
    }).catch( function(erro) {
        res.send('Houve um erro: ' + erro);
    });
});

app.get('/deletar/:id', function(req, res) {
    Post.destroy({where: {'id': req.params.id}}).then( function() {
        res.redirect('/');
    }).catch( function(erro) {
        res.send('Esta postagem não existe!');
    });
});

const serverLocation = 3000;
app.listen(serverLocation, async function() {
    await setup();
});
