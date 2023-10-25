import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
    res.render("today.ejs", data);
})

app.get("/work", (req, res) => {
    res.render("work.ejs");
})

app.post("/todaySubmit", (req, res) => {
    res.render("today.ejs", data);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

const data = {
    greeting: greetingType()
}