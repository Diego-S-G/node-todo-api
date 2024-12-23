const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Connected to MongoDb!!');
});

const todoSchema = new mongoose.Schema({
    text: String,
    done: Boolean
});

todoSchema.statics.all = async function(callback) {
    try {
        const todos = await Todo.find({});
        callback({todos: todos});
    } catch (err) {
        handleError(err);
    }
};

todoSchema.statics.createDocument = async function(params, callback) {
    try {
        const todo = await Todo.create({text: params.text, done: params.done});
        callback(todo);
    } catch (err) {
        handleError(err);
    }
};

todoSchema.statics.updateDocument = async function(id, params, callback) {
    try {
        const todo = await Todo.findOneAndUpdate({_id: id}, {text: params.text, done: params.done}, {new: true});
        callback(todo);
    } catch (err) {
        handleError(err);
    }
};

const Todo = mongoose.model('Todo', todoSchema);

function handleError(err) {
    console.error('Error:', err);
}

module.exports = Todo;