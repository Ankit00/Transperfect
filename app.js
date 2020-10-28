const express = require("express");
const app = express();
const mongoose = require("mongoose");
const accessoryRouter = require("./Routers/dataRouter");

app.use(express.json());
app.use('/v1',accessoryRouter);

app.all("*",(req,res,next)=>{
    res.status(404).json({
        message : `Can not find the ${req.originalUrl} url`
    })
    next();
})
mongoose.connect("mongodb://localhost:27017/myDB",{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
}).then(()=>{
    console.log("DB Connected Successfully");
});

app.listen(3000, () => {
    console.log("Server listening to port 3000");
});