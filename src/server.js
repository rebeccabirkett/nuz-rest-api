require("./db/connection");
const express = require("express");
const { User } = require("./models/User");

const port = process.env.PORT || 5000;
// init instance of express
const app = express();

//middleware
app.use(express.json());

//routes/endpoints
app.get("/health", (req, res) => {
    res.send({
        message: "API is working correctly"
    })
});

app.get("/user", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).redirect("https://http.cat/500").send(error);
    }
});

app.post("/user", async (req, res) => {
    //route to add a user
    try {
        const user = new User(req.body);
        //^ this is the same as:
        // const user = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // });
        const returnedValue = await user.save();
        res.status(201).send(`Successfully added new user: ${returnedValue.name}`);
    } catch (error) {
        res.status(400).redirect("https://http.cat/400").send(error);
    }
});

app.patch("/user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).redirect("https://http.cat/400").send({ message: "user not found" });
    }
});

app.delete("/user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).redirect("https://http.cat/400").send({ message: "user not found" });
    }
});

//server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});