import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const todayTodos = [];
const workTodos = [];

function greetingType() {
    let currentHour = new Date().getHours();
    if (currentHour > 6 && currentHour < 13) {
        return "Morning";
    } 
    else if (currentHour > 13 && currentHour < 20) {
        return "Afternoon";
    } 
    else {
        return "Evening";
    }
}

let hourGreeting = greetingType();

app.get("/", (req, res) => {
    res.render("today.ejs", { greeting: hourGreeting, todos: todayTodos });
})

app.get("/work", (req, res) => {
    res.render("work.ejs", { greeting: hourGreeting, todos: workTodos });
})

app.post("/", (req, res) => {
    todayTodos.push(req.body["todo"]);
    res.render("today.ejs", { greeting: hourGreeting, todos: todayTodos });
})

app.post("/work", (req, res) => {
    workTodos.push(req.body["todo"]);
    res.render("work.ejs", { greeting: hourGreeting, todos: workTodos });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})