import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import {setup} from './models/db.js';
import PostService from './services/post.js';

const app = express();

app.set('views', path.resolve(import.meta.dirname, 'views'));
app.engine('handlebars', engine({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', async function(_, res) {
    const posts =  await PostService.findAll();
    res.render('home', {
        posts,
    });
});

app.get('/create-post', function(req, res) {
    res.render('form',{
        title: req.query.title || '',
        content: req.query.content || '',
        error: req.query.error,
    });
});

app.post('/create-post', async function(req, res) {
    try {
        await PostService.create(req.body.title, req.body.content);
    } catch (error) {
        res.redirect(`/create-post?error=${
            error.message
        }&title=${
            req.body.title
        }&content=${
            req.body.content
        }`);
        return;
    }

    res.redirect('/');
});

app.get('/delete-post/:id', async function(req, res) {
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
