const MongoDBClient = require("../MongoDBClient")
const { ObjectID } = require("bson");

class userMiddleware{
    static async isValidUser(req,res,next){
        try{
            const data = {email:req.body.email};
            const result = await MongoDBClient.users().findOne(data);
            if(result == null){
                return res.status(401).json({message:"Email-id does not exit"});
            }
            if(result.pwd!=req.body.pwd){
                return res.status(401).json({message:"Incorrect Password"});
            }
            next();
        }
        catch(err){
            return res.status(500).json({message:"Unexpected error occured"});
        }
    }
    static async isValidData(req,res,next){
        try{
            const data = {email:req.body.email};
            const result = await MongoDBClient.users().findOne(data);
            console.log(result);
            if(result !=null){
                return res.status(401).json({message:"Email-id already exist"});
            }            
            next();

        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:"Unexpected error occured"});
        }
        
    }
    static async verifyUser(req,res,next){
        try{
            if(req.session.user){
                const result = await MongoDBClient.users().findOne({_id:ObjectID(req.session.user._id)});
                if(result==null){
                    return res.status(401).json({message:"User Doesn't exist"});
                }
                next();
            }
            else{
                return res.status(401).json({message:"please login to continue"})
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:"unexpected error occured"});
        }
    }
}

module.exports=userMiddleware;