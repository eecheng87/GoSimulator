let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let socket = require('socket.io');
const port = 4000;
let indexRouter = require('./routes/index').router;
let uploadRouter = require('./routes/uploads').router;


let app = express();
let server = app.listen(port, () => {
    console.log(`listen to port ${port}`);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// acquire static data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

// socket set up
let io = socket(server);
io.on('connection', (socket) => {
    socket.on('kifu_start', (data) => {
        // response to who emit, instead of using io.sockets.emit
        socket.emit('kifu_info', {
            message: 'hihi'
        });
    });
})


// process routing
app.use('/', indexRouter);
app.use('/uploads', uploadRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});



// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;