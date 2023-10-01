const fs = require("fs/promises");
const { isAuthorised } = require("../middlewares");
const { Todo } = require("../db/models/Todo");
const uuid =require('uuid')

const router = require("express").Router();

router.get("/", isAuthorised, async (req, res) => {
    try {
        const { user } = req;
        const todos = await Todo.find({userId:user.id})
        return res.json({
            data: todos,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server error",
          success: false,
        });
    }
})

router.post('/',isAuthorised,async(req,res)=>{
    try{
        const {user} = req
        const {title} = req.body
        if(!title){
            return res.status(400).json({
                message:'title is required',
                success:false
            })
        }
        const todo = await Todo.create({
                title,
                complete:false,
                userId:user.id
        })
        return res.json({
            data:todo,
            success:true,
            message:'todo created successfully'

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server error",
          success: false,
        });
      }
})

// Create a Todo
router.post('/', async (req, res) => {
    const { title, userId } = req.body;
  
    try {
      const todo = new Todo({ title, userId });
      await todo.save();
      res.status(201).json({ success: true, data: todo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // Update a Todo
  router.patch('/:id', async (req, res) => {
    const { title } = req.body;
  
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, { title }, { new: true });
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // Delete a Todo
  router.delete('/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Todo deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  module.exports = router;