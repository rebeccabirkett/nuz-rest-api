require("./db/connection");
const express = require("express");
const { userRouter } = require("./routes/users");
const { postRouter } = require("./routes/posts");

const port = process.env.PORT || 5000;

// init instance of express
const app = express();

//middleware
app.use(express.json());

app.use("api/nuztrack", userRouter);
app.use("api/nuztrack", postRouter);

//routes/endpoints
app.get("/health", (req, res) => {
    res.send({
        message: "API is working correctly"
    })
});

//server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});