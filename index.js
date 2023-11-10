import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const todayTodos = [];
const workTodos = [];
let user;
let logged = false;


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
};

function checkLog() {
    if (user) {
        logged = true;
    }
};

let hourGreeting = greetingType();

app.get("/", (req, res) => {
    if (user) {
        res.redirect("/today");
    } else {
        res.render("login.ejs", { userName: user, userLogged: logged, greeting: hourGreeting });
    }
});

app.post("/submit", (req, res) => {
    user = req.body.userName;
    res.redirect("/today")
});

app.get("/today", (req, res) => {
    if (user) {
        checkLog();
        res.render("today.ejs", { greeting: hourGreeting, todos: todayTodos, userName: user, userLogged: logged  });
    } else {
        res.redirect("/");
    }  
});

app.get("/work", (req, res) => {
    if (user) {
        res.render("work.ejs", { greeting: hourGreeting, todos: workTodos, userName: user, userLogged: logged });
    } else {
        res.redirect("/")
    }
});

app.post("/submitToday", (req, res) => {
    todayTodos.push(req.body["todo"]);
    res.redirect("/today");
});

app.post("/submitWork", (req, res) => {
    workTodos.push(req.body["todo"]);
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});