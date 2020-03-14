const app=require('express')();
const connectDB=require('./config/db');

const bodyParser=require('body-parser');
//call DB.. connect DataBase
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res)=> res.send('API running'))

//defile Routers
app.use('/api/users', require('./router/api/users'));

app.use('/api/auth', require('./router/api/auth'));

app.use('/api/profile', require('./router/api/profile'));
app.use('/api/posts', require('./router/api/posts'));

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`) );