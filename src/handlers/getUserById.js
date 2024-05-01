const mongoose = require("mongoose");
const {connectDatabase} = require("../Database/db");
const User = require("../model/user");

module.exports.handler = async (event, context) =>{
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        await connectDatabase();
        userObj = await User.findById(event.pathParameters.id);

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