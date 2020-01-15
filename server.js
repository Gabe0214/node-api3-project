const express = require('express');

const postRoutes = require('./posts/postRouter')

const userRoutes = require('./users/userRouter')

const server = express();

server.use(express.json())

server.use('/api/posts', postRoutes)

server.use('/api/users', userRoutes)

server.get('/', logger , (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



//custom middleware

 function logger(req, res, next) {
 const { method , originalUrl } = req;

 console.log(`${method} to ${originalUrl}`)

 next();

}

module.exports = server;
