require("./db/connection");
const express = require("express");

const port = process.env.PORT || 5000;
// init instance of express
const app = express();

//routes/endpoints
app.get("/health", (req, res) => {
    res.send({
        message: "API is working correctly"
    })
});

//get/post requests for users
app.get("/user", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).redirect("https://http.cat/200").send(allUsers);
    } catch (error) {
        res.status(500).redirect("https://http.cat/500").send(error);
    }
});

app.post("/user", async (req, res) => {
    try {
        const user = new User(req.body);
        const returnedValue = await user.save();
        res.status(201).redirect("https://http.cat/201").send({
            message: `Successfully added new user: ${returnedValue.name}`
        });
    } catch (error) {
        res.status(400).redirect("https://http.cat/400").send(error);
    }
});

//server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});