'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cookie());

const users = {
    's.volodin@corp.mail.ru': {
        email: 's.volodin@corp.mail.ru',
        password: 'password',
        age: 25,
        images: [
            {src: '/273153700_118738253861831_5906416883131394354_n.jpeg', likes: 120},
            {src: '/272708814_1158833634855293_1743973316352152210_n.webp.jpg', likes: 250},
            {src: '/272464515_147005761018515_3100264353239753904_n.webp.jpg', likes: 201},
            {src: '/259096143_252774593424446_3292295880799640700_n.jpeg', likes: 300},
        ]
    },
    'aleksandr.tsvetkov@corp.mail.ru': {
        email: 'aleksandr.tsvetkov@corp.mail.ru',
        password: 'password',
        age: 28,
        images: [
            {src: '/19984805_468099790230913_7469029070697660416_n.jpeg', likes: 100500},
            {src: '/16583858_168051673696142_846500378588479488_n.jpeg', likes: 350},
        ],
    },
    'user@ya.ru': {
        email: 'user@ya.ru',
        password: 'password',
        age: 28
    }
};

const films = [
    {
        title: 'Fast And Furious',
        duration: '2ч 30м',
        poster: '/fastAndFurious1.jpg'
    },
    {
        title: 'Fast And Furious',
        duration: '2ч 30м',
        poster: '/fastAndFurious2.jpg'
    },
    {
        title: 'Fast And Furious',
        duration: '2ч 30м',
        poster: '/fastAndFurious3.jpg'
    },
    {
        title: 'Fast And Furious',
        duration: '2ч 30м',
        poster: '/fastAndFurious4.jpg'
    },
    {
        title: 'Fast And Furious',
        duration: '2ч 30м',
        poster: '/fastAndFurious5.jpg'
    },
];

const ids = {};

app.get('/films', (req, res) => {
    res.json(films);
});

app.post('/signup', (req, res) => {
    const password = req.body.password;
    const passw_conf = req.body.passw_conf;
    const email = req.body.email;
    if (
        !password || !email ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/) ||
        !(passw_conf === password)
    ) {
        return res.status(400).json({error: 'Не валидные данные пользователя'});
    }
    if (users[email]) {
        return res.status(400).json({error: 'Пользователь уже существует'});
    }

    const id = uuid();
    const user = {email, password};
    ids[id] = email;
    users[email] = user;

    const access_token = user;
    const refresh_token = id;
    res.cookie('access', access_token, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.cookie('refresh', refresh_token, {expires: new Date(Date.now() + 10 * 60 * 10)});
    res.status(201).json({id});
});

app.post('/login',  (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    if (!password || !email) {
        return res.status(400).json({error: 'Не указан E-Mail или пароль'});
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
    }

    const id = uuid();
    ids[id] = email;
    const refresh_token = id;

    res.cookie('refresh', refresh_token, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json({id});
});


app.post('/logout', (req, res) => {
    const refresh_token = 'destroyed';
    res.cookie('refresh', refresh_token, {expires : new Date(Date.now())});
    res.status(200).json({refresh_token});
});


app.get('/me', (req, res) => {
    const id = req.cookies['refresh'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    res.json(users[email]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
