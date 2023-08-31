const express = require('express');
const MongoDBClient = require("./MongoDBClient")
const cookieSession=require("cookie-session")
const app = express();

app.set("view engine", "ejs");
app.set("views", "public");

app.use(express.static('public'));
app.use(express.json());


app.use(cookieSession({
    name: 'session',
    keys: ['key'],

    maxAge: 24 * 60 * 60 * 1000 ,// 24 hours
}))
app.delete("/logout",function(req,res){
    req.session=null;
    res.status(200).json({message:"Successfully logged-out"})
})

app.use("/api/v1", require("./routes"));

app.get("/*",function (req,res){
    const userInfo = req.session.user;
    return res.render("index", { userInfo: userInfo ? userInfo : {} });
});



(async function () {
    await MongoDBClient.connect()
    const port = process.env.port || 4000;
    app.listen(port, async function (err) {
        if (err) throw err;
        console.log(`App running in http://localhost:${port}`);
    });
})();