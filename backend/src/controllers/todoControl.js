const Todo = require('../models/todo');

module.exports = {
   async store(request, response){
      const { name, category, status } = request.body;

      const todo = await Todo.create({
         name, 
         category, 
         status
      });

      return response.json(todo);
   },

   async index(request, response){
      const todos = await Todo.find();

      return response.json(todos);
   },

   async search(request, response){
      const { taskid } = request.body;

      const task = await Todo.findOne({ '_id' : taskid});
   
      return response.json(task);
   },

   async destroy(request, response){
      const { id } = request.body;

      const res = await Todo.deleteOne({'_id' : id});

      return response.json(res);
   }, 

   async edit(request, response){
      const { id, todo} = request.body;

      const up = await Todo.updateOne({'_id' : id}, todo);

      return response.json(up);
   }
}