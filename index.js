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
// const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);

// const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const blogsRouter = require('./routes/blogs');
const errorHandle = require('./middlewares/errorHandle');

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
  // store: new MongoStore({ url: config.mongodb }),
}));


// app.use(flash());

// app.use(require('express-formidable')({
//   uploadDir: path.join(__dirname, 'public/img'),
//   keepExtensions: true,
// }));


// app.use((request, response, next) => {
//   response.locals.user = request.session.user;
//   response.locals.success = request.flash('success').toString();
//   response.locals.error = request.flash('error').toString();
//   next();
// });
// app.use('/', (req, res) => {
//   res.end('AHHA');
// });

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/blogs', blogsRouter);

app.use(errorHandle);
app.listen(config.port);
