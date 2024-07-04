import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import {setup} from './models/db.js';
import PostModel from './models/post.js';
import PostService from './services/post.js';

const app = express();

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', async function(_, res) {
    const posts =  await PostService.findAll();
    res.render('home', {
        posts,
    });
});

app.get('/cad', function(_, res) {
    res.render('formulario');
});

app.post('/add', async function(req, res) {
    try {
        await PostService.create(req.body.title, req.body.content);
        res.redirect('/');
    } catch (err) {
        res.send('Houve um erro: ' + err);
    }
});

app.get('/deletar/:id', async function(req, res) {
    try {
        await PostService.delete(req.params.id);
        res.redirect('/');
    } catch {
        res.send('Esta postagem não existe!');
    }
});

const serverLocation = 3000;
app.listen(serverLocation, async function() {
    await setup();
});
