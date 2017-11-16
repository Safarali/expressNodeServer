const express = require('express');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const fs = require('fs');

let app = express();

// Listen to partials
hbs.registerPartials(__dirname + '/views/partials');
// Helper methods
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

// Handlebars util, listen to partials
hbsutils.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');
// Set up hbs
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to your home!!!!',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});
app.listen(3000, () => {
    console.log('Server is up in 3000 port')
});
