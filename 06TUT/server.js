const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500','http://127.0.0.1:3500']
const corsOptions = {
    origin: (origin, callback) =>{
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//built-in context-type: application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: false}));

//built-in middleware for json
app.use(express.json());

//built-in to serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'))

app.use('/employees', require('./routes/api/employees'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.sendFile({error: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
});


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



