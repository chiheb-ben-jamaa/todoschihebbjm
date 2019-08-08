//import the model instance (Task)
const Task = require('../models/tasks.model.js');




// Create and Save a new Note
exports.create = (req, res) => {
    // Step 0 ==>  Validate request
    if((!req.body.description) && (!req.body.category)&&(!req.body.time)) {
        return res.status(400).send({
            message: "Tasks description & category & time can not be empty"
        });
    }



    // Step 1 ==>   Create a New task from the Task model (in tasks.model.js)
    const task = new Task({
        title: req.body.title || "Untitled Note", 
        description: req.body.description,
        category: req.body.category,
        time: req.body.time
    });



    // Step 2 ==>  Save task (const) in the database
    task.save()
    .then(data => {
        res.send({ message: 'New task has been created successfully.' });
        console.log("New task has been created successfully.")

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};












// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    //adding some logic to hendle the search query :
    if (!req.params.keyword)
    {
        //exucte the search query :
            //send in body feild the specifque feild to search (description or category)
            SearchFilter=req.body.SearchFilter
            if (SearchFilter=="description")
            {
                //search for description == keyword
                //with keyword taken from url & SearchFilter taken from the body request
            }
            else if (SearchFilter=="category"){
                //search for category == keyword 
                 //with keyword taken from url & SearchFilter taken from the body request
            }
    }
    else {

        //desplay all feild

    }
    Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};











// Find a single note with a taskId
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });            
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};






/*
exports.find() = (req, res) => {
    const keyword=req.params.keyword

     // Validate request
     if(!keyword) {
        return res.status(400).send({
            message: "Enter keyword can not be empty"
        });
    }


    //Decalare the query :
    var query = { sku: { $regex: /^keyword/i } };  
    Task.find(query)
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    /*
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });            
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
   


};

*/











// Update a task identified by the taskId in the request
exports.update = (req, res) => {
    // Validate Request
    if((!req.body.description) || (!req.body.category) || (!req.body.title)) {
        return res.status(400).send({
            message: "task description & category & title can not be empty"
        });
    }

    // Find note and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        title: req.body.title || "Untitled Task",
        description: req.body.description,
        category: req.body.category,
        time: req.body.time

    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error updating task with id " + req.params.taskId
        });
    });
};









// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });
        }
        res.send({message: "task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {f
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });
};






