import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import {setup} from './models/db.js';
import PostModel from './models/post.js';

const app = express();

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(_, res) {
    PostModel.findAll({order: [['id', 'DESC']]}).then( function(posts) {
        res.render('home', {
            posts: posts,
        });
    });
});

app.get('/cad', function(_, res) {
    res.render('formulario');
});

app.post('/add', function(req, res) {
    PostModel.create({
        title: req.body.title,
        content: req.body.content,
    }).then( function() {
        res.redirect('/');
    }).catch( function(erro) {
        res.send('Houve um erro: ' + erro);
    });
});

app.get('/deletar/:id', function(req, res) {
    PostModel.destroy({where: {'id': req.params.id}}).then( function() {
        res.redirect('/');
    }).catch( function(_) {
        res.send('Esta postagem não existe!');
    });
});

const serverLocation = 3000;
app.listen(serverLocation, async function() {
    await setup();
});
