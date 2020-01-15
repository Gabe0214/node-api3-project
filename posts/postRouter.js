const express = require('express');

const postsDataBase = require('./postDb')



const router = express.Router();



router.get('/', (req, res) => {
  // do your magic!
   postsDataBase.get()
   .then( item => {
     res.status(201).json(item)
   })
   .catch(error => {
     res.status(500).json({error: "Something went wrong in the database"})
   })

});

 function validId( req, res, next){
    

    postsDataBase.getById(req.params.id)
    .then(result => {
        if(result){
          req.result = result.id
          next();
        } else {
          res.status(404).json({message: "Specified Id does not exist"})
        }
    })
 }

router.get('/:id', validId , (req, res) => {
  // do your magic!

   
  postsDataBase.getById(req.result)
   .then( result => {
     res.status(201).json(result)
   }) 
   .catch(error => {
     res.status(500).json({errorMessage: "Error with server"})
   })


});

router.delete('/:id' ,validId, (req, res) => {
  // do your magic!
   postsDataBase.remove(req.result)
   .then( result => {
     res.status(201).json(4)
   })
   .catch(error => {
     res.status(500).json({error: "Something is wrong in database"})
   })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware



module.exports = router;
