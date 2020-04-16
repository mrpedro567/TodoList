const Category = require('../models/category');

module.exports = {
   async store(request, response){
      const { name } = request.body;

      const cat = await Category.create({
         name
      });

      return response.json(cat);
   },

   async index(request, response){
      const cats = await Category.find();

      return response.json(cats);
   },

   async destroy(request, response){
      const { id } = request.body;

      await Category.deleteOne({'_id' : id});

      return response.json({ message: 'Deleted'});
   }, 

   async edit(request, response){
      const { id, name} = request.body;

      const up = await Category.updateOne({'_id' : id}, { 'name': name});

      return response.json(up);
   }
}