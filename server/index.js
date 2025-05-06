const express = require("express"); 
const env = require("./env.js");

// Dependencies
const path = require("path");
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const https = require('https');
const fs = require('fs');

const nodeCron = require("node-cron");
const funcObj = require('./utils/functions.js');

/**
 * Import Routes
 */
const testRoutes = require('./routes/testRoutes.js');
const authRoutes = require("./routes/authRoutes.js");
const studentRoutes = require("./routes/studentRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require('./routes/postRoutes.js');
const adminCategoryRoutes = require('./routes/admin/categoriesRoutes.js');
const schoolRoutes = require('./routes/admin/schoolRoutes.js');
const adminPostRoutes = require('./routes/admin/adminPostRoutes.js');
const roleRoutes = require('./routes/admin/roleRoutes.js');
const marketRoutes = require('./routes/marketPlaceRoutes.js')
const coreServiceRoutes = require('./routes/coreServicesRoutes.js')
const forumRoutes = require('./routes/forumRoutes.js')

const auth = require('./middlewares/jwt.js');
const rateLimit = require('express-rate-limit');
const chatController  = require('./controllers/chatController.js');
const forumController = require('./controllers/forumController.js')


// Initialize express
const app = express();
const port = env?.port || 5001;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

const corsOptions = {
    origin: '*', // Allow all origins (replace with your frontend URL in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Enable cookies/tokens if needed
};

app.use(cors(corsOptions));

// Parse application json
app.use(express.json());
app.disable('x-powered-by')


// append request time to all request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

// Serve uploaded images statically
app.use("/api/v1/uploads", express.static(path.join(__dirname, "../uploads")));

// APIs 
// app.use('/admin', adminRoutes);
// app.use('/app', appRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

  
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/admin/category', adminCategoryRoutes);
app.use('/api/v1/admin/school', schoolRoutes);
app.use('/api/v1/admin/post', adminPostRoutes);
app.use('/api/v1/admin/roles', roleRoutes);
app.use('/api/v1/market-place', marketRoutes);
app.use('/api/v1/core-services', coreServiceRoutes);
app.use('/api/v1/forum', forumRoutes);

// Instantiate the HTTPS server
const credentials = {
    'key' : fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert' : fs.readFileSync(path.join(path.join(__dirname, '/../https/-cert.pem'))),
  };

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// 3. Attach Socket.io to the same server
const io = socketIo(httpServer, {
    cors: {
      origin: "*", // Match your Express CORS config
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);
    
    socket.on('chat-message', async (data) => {
      // Handle chat messages

      chatController.createChat(data.school_id, data.sender_id, data.receiver_id, data.message)
      .then((res) => {
        if (res.status == 200) {
          socket.broadcast.to(data.receiver_id).emit('receive-message', data);
        }
      })
      .catch((err) => {
        console.error('Error creating chat:', err);
      });
    });


    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    socket.on('form-message', (data) => {

      forumController.createForumMessage(data.school_id, data.forum_id, data.user_id, data.message)
      .then((res) => {
        if (res.status == 200) {
          socket.broadcast.to(data.forum_id).emit('receive-forum-message', data);
        }
      })
      .catch((err) => {
        console.error('Error creating forum chat:', err);
      });
    })
  });


httpServer.listen(port, () => {
    console.log(`Server up and running on port: ${port}.`)
});