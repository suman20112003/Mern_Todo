const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./model/todo');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/MernTodo').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(e => {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get("/delete",(req,res)=>{
    TodoModel.deleteOne({}).then((data)=>{
        console.log(data);
        res.status(200).json({mess:"ok"});
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
