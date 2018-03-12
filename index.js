/** Created By ChrisWen
 *  Main Entrance
 *  18/03/09
 */

const express = require('express');

const app = express();

const path = require('path');
const indexRouter = require('./routes/index');

const errorHandle = require('./middlewares/errorHandle');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);
app.use(errorHandle);
app.listen(3000);
