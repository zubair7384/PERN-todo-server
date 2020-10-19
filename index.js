const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json()); // allows us to access the req.body

//ROUTES

// create a todos
app.post("/todos", async (req, res) => {

    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1)", [description])
        res.json(newTodo);
        console.log("new added")

    } catch (err) {
        console.error(err.message);
    }

})

// get all todos 
app.get("/todos", async (req, res) => {

    try {

        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);
    }

})

// get a todo
app.get("/todos/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }

})

// update a todos
app.put("/todos/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
        res.json("todo updated");

    } catch (err) {
        console.error(err.message);
    }

})

// delete a todos

app.delete("/todos/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo deleted successfully");

    } catch (err) {
        console.error(err.message);
    }

})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})

