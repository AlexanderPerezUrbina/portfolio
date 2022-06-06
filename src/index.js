const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('views', path.resolve(__dirname, '../resources/views'));

const views = (path) => {
    return app.get('views') + '/' + path;
}

app.get('/', (req, res) => {
    res.sendFile(views('home.html'))
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
