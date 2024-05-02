const mongoose = require("mongoose");
const {connectDatabase} = require("../Database/db");
const User = require("../model/user");

module.exports.handler = async (event, context) =>{
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        await connectDatabase();
        const email = event.queryStringParameters.email;
        const userObj = await User.findOne({email: email}).select("+password");

        return {
            statusCode: 200,
            body: JSON.stringify(userObj)
        }

    }catch (error){
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({error : error.message})
        }
    }
}