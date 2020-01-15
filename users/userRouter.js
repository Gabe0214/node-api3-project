const express = require('express');

const userData = require('./userDb')
const postDataBase = require('../posts/postDb')
const router = express.Router();

router.post('/', validateUser ,(req, res) => {
  // do your magic!
   userData.insert(req.body)
   .then( result => {
     res.status(201).json(result)
   })
   .catch(error => {
     res.status(500).json({errorMessage: "Something went wrong with server"})
   })

});

router.post('/:id/posts', [validateUserId ,validatePost], (req, res) => {
  // do your magic!
   if(!req.body.user_id){
     res.status(401).json({message: "Please provide ID property"})
   } else {
    postDataBase.insert(req.body)
    .then( result => {
      res.status(201).json(result)
    })
    .catch(error => {
      res.status(500).json({message: "Something went wrong with the server"})
    })
   }
    
    
});

router.get('/', (req, res) => {
  // do your magic!
  userData.get()
  .then( result => {
    res.status(201).json(result)
  })
 .catch(error => {
   res.status(500).json({error: "something went wrong with the server"})
 })
});



router.get('/:id', validateUserId, (req, res) => {
  // do your magic!

  userData.getById(req.user.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "Something went wrong with the server"})
  })
});

router.get('/:id/posts' , validateUserId, (req, res) => {
  // do your magic!
  postDataBase.getById(req.user.id)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(500).json({error: "error with server"})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userData.remove(req.user.id)
  .then( result => {
    res.status(201).json(4)
  })
  .catch(error => {
    res.status(500).json({error: "Something went wrong with the server"})
  })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // do your magic!
  userData.update(req.user.id, req.body)
  .then( result => {
    res.status(201).json(result)
  })
  .catch(error => {
    res.status(500).json({error: "Something went wrong whe updting user"})
  })

});

//custom middleware


function validateUserId(req, res, next) {
  // do your magic!
    userData.getById(req.params.id)
    .then( user => {
      if(user) {
        req.user = user
        next()
      } else {
        res.status(404).json({error: "Id does not exist"})
      }
    })
}
function validateUser(req, res, next) {
  // do your magic!
  const { name } = req.body 
 if(name) {
   next()
 } else {
   res.status(401).json({error: "Please provide a name property"})
 }
}

function validatePost(req, res, next) {
  // do your magic!
 

  if(!req.body) {
    res.status(401).json({error: "Please provide a user id and text property"})
  } else if(!req.body.text){
    res.status(401).json({error: "Please insert a text property"})
  } else{
    next()
  }


}

module.exports = router;
