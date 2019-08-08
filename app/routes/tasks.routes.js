module.exports = (app) => {
    const tasks = require('../controllers/tasks.controller.js');

    // Create a new Tasks
    app.post('/api/tasks', tasks.create);

    // Retrieve all Tasks
    app.get('/api/tasks', tasks.findAll);

    // Retrieve a single Task with noteId
    app.get('/api/tasks/:taskId', tasks.findOne);

    // Update a Task with noteId
    app.put('/api/tasks/:taskId', tasks.update);

    // Delete a Task with noteId
    app.delete('/api/tasks/:taskId', tasks.delete);
     
    //Retrieve a all Tasks with description
    //app.get('api/tasks/search/:keyword',tasks.find);       

    //Retrieve all Tasks with category 
    //app.get('api/tasks/category/search/:keyword',tasks.find)

}
