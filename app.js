const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));

router.route('/todos')
    .get((req, res) => {
        res.json([{
            "_id": 1,
            "text": 'Do the laundry',
            "done": false
        }, {
            "_id": 2,
            "text": 'Do the dishes',
            "done": true
        },
        {
            "_id": 3,
            "text": 'Do the homework',
            "done": true
        },
        {
            "_id": 4,
            "text": 'Do the shopping',
            "done": false
        },
        {
            "_id": 5,
            "text": 'Do the cooking',
            "done": false
        }
        ]);
    })

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port} yatta!`));