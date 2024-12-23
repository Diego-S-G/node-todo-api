const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

const Todo = require('./todo');

router.get('/', (req, res) => res.send('Hello World!'));

router.route('/todos')
    .get((req, res) => {
        Todo.all(function(data) {
            console.log('Retrieved all Todos');
            res.json(data);
        });
    })
    .post((req, res) => {
        Todo.createDocument(req.body, function(data) {
            console.log(`Todo created with id: ${data._id}`);
            res.json(data);
        });
    });

router.route('/todos/:todo_id')
    .put((req, res) => {
      Todo.updateDocument(req.params.todo_id, req.body, function(data){
        console.log(`Todo id ${data._id} updated!`);
        res.json(data);
      });
    });


app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port} yatta!`));