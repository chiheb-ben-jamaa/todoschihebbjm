const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    time: String

}, {
    timestamps: true
});

// The model name is Task:
module.exports = mongoose.model('Task', TaskSchema);