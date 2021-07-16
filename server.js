//Name : abdallah natsheh
const express = require('express')
    require('./db/mongoose'),
    path = require('path'),
    routers = require('./routes/routes.js');
const port = 3001;

const app=express();

app.use('/list', express.static(path.join(__dirname, 'html/index.html')));
app.use('/create_tour', express.static(path.join(__dirname, 'html/create_tour_form.html')));
app.use('/update_tour', express.static(path.join(__dirname, 'html/update_tour_form.html')));
app.use('/create_site', express.static(path.join(__dirname, 'html/create_site.html')));
app.use('/create_guide', express.static(path.join(__dirname, 'html/create_guide.html')));
app.use('/delete_site', express.static(path.join(__dirname, 'html/index.html')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, '/public')));

//restfull 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});