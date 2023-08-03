const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const admin = require('firebase-admin');
const serviceAccount = require('./utils/service-account');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-access-token', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Headers', 'Access-Control-Request-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials'],
    }
));
app.use(bodyParser.urlencoded({ extended: true }));

connectDB()
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://glopilot.firebaseio.com'
    });
}
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/', require('./routes/user'))
app.use('/vehicle', require('./routes/owner'))

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})

