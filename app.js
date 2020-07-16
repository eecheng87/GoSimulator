let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let socket = require('socket.io');
const port = 4000;
let indexRouter = require('./routes/index').router;
let uploadRouter = require('./routes/uploads').router;
let kifu_parser = require('./src/js/kifu_parser');


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
    socket.on('kifu_start', async(obj) => {
        // data contain info about target kifu
        /* kifu_obj is object of array, structure of each object

        {
            x: coordinates of x,
            y: coordinates of y,
            color: color of stone,
            comment: content of comment
        }

        */
        let kifu_obj = await kifu_parser.async_read('15e7b8a5f59ee0d0d89a666fe0d0c5c2').then(
            res => {
                let arr = res.split(/\(;|;/);
                let obj = [];
                arr.forEach(element => {
                    if (element) {
                        if (element.search(/^W\[|^B\[/) < 0) {
                            return;
                        }
                        let cmt_pos = element.indexOf('C[');
                        let stone_info = element.substr(0, 5);
                        let cmt = cmt_pos < 0 ? "" : element.slice(cmt_pos + 2);

                        obj.push({
                            x: stone_info.charCodeAt(2) - "a".charCodeAt(0),
                            y: stone_info.charCodeAt(3) - "a".charCodeAt(0),
                            color: stone_info.charAt(0),
                            comment: cmt
                        })
                    }
                });
                return obj;
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
        // response to who emit, instead of using io.sockets.emit
        socket.emit('kifu_data', {
            message: kifu_obj
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