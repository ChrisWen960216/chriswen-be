/** Created By ChrisWen
 *  Main Entrance
 *  18/03/09
 */

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
// const formiable = require('express-formidable');
// const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);

// const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const blogListRouter = require('./routes/blogList');
const uploadRouter = require('./routes/upload');
const carouselRouter = require('./routes/carousel');
const filedsRouter = require('./routes/fileds');

const errorHandle = require('./middlewares/errorHandle');
const notFoundHandle = require('./middlewares/notFoundHandle');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: config.session.maxAge },
}));

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/blogList', blogListRouter);
app.use('/upload', uploadRouter);
app.use('/carousel', carouselRouter);
app.use('/fileds', filedsRouter);


app.use(notFoundHandle);
app.use(errorHandle);

app.listen(config.port);
