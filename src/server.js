require("./db/connection");
const express = require("express");
const {
    Post
} = require("./models/Post");
const {
    User
} = require("./models/User");

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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).redirect("https://http.cat/400").send({
            message: "user not found"
        });
    }
});

app.delete("/user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).redirect("https://http.cat/400").send({
            message: "user not found"
        });
    }
});

//post routes
app.get("/posts", async (req, res) => {
    try {
        const allPosts = await Post.find({})
        res.status(200).send(allPosts)
    } catch (error) {
        console.log(error)
        res.status(500).redirect("https://http.cat/500").send(error);
    }
});

app.get("/posts/:user_id", async (req, res) => {
    try {
        const allPosts = await Post.find({
            author: req.params.user_id
        })
        res.status(200).send(allPosts)
    } catch (error) {
        console.log(error)
        res.status(500).redirect("https://http.cat/500").send(error);
    }
});

app.post("/posts/:user_id", async (req, res) => {
    try {
        const post = new Post(req.body)
        post.author = req.params.user_id
        const returnedValue = await post.save();
        res.status(201).send(returnedValue)
    } catch (error) {
        console.log(error)
        res.status(400).redirect("https://http.cat/400").send(error);
    }
});

app.patch("/posts/:user_id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        console.log(post);
        res.status(200).send(post);
    } catch (error) {
        console.log(error)
        res.status(404).redirect("https://http.cat/404").send(error);
    }
});

app.delete("/posts/:user_id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).send(post);
    } catch (error) {
        console.log(error)
        res.status(404).redirect("https://http.cat/404").send(error);
    }
});

//server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});