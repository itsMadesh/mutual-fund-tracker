const MongoDBClient = require("../MongoDBClient");
const { ObjectID } = require("bson");

class userController{
    static async login(req,res){
        try{
            const data ={
                email:req.body.email,
                pwd:req.body.pwd
            }
            const result = await MongoDBClient.users().findOne(data);
            req.session.user={_id:result._id,email:result.email};
            return res.status(200).json({message:"Successfully logged-in",user:req.session.user});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:err});
        }
    }
    static async signup(req,res){
        try{
            const data ={
                name:req.body.name,
                email:req.body.email,
                pwd:req.body.pwd,
                favourites:{}
            }
            const result = await MongoDBClient.users().insertOne(data);
            const resp=await MongoDBClient.users().findOne({"email":req.body.email});
            console.log(req.session);
            req.session.user={_id:resp._id,email:resp.email};
            return res.status(200).json({message:"Successfully signed-up",user:req.session.user});

        }
        catch(err){
            return res.status(500).json({message:err});         
        }

    }
    static async addToFav(req,res){
        try{
            const fav=req.body.fav;
            const query = { _id: ObjectID(req.session.user._id) };
            const set = {$set:{favourites:fav}} ;
            const result = await MongoDBClient.users().updateOne(query, set);
            console.log(result);
            return res.status(200).json({ message: "success" });

        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: "Unexpected error occured" });
        }
    }
    static async getFav(req,res){
        try{
            const query = { _id: ObjectID(req.session.user._id) };
            const result =await MongoDBClient.users().find(query).project({_id:0,favourites:1}).toArray();
            console.log(result);
            res.status(200).json(result[0].favourites);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: "Unexpected error occured" });
        }
    }
    static async setTarget(req,res){
        try{
            const id=req.body.schemeCode;
            const query = { _id: ObjectID(req.session.user._id) };
            const set = {$set:{favourites:{`${}`:{target:req.body.target}}}} ;
            const result = await MongoDBClient.users().updateOne(query, set);
            console.log(result);
            return res.status(200).json({ message: "successfully target value setted" });

        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: "Unexpected error occured" });
        }
    }

    
}

module.exports = userController;