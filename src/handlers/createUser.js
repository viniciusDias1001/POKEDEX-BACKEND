const mongoose = require("mongoose");
const {connectDatabase} = require("../Database/db");
const User = require("../model/user");


module.exports.handler = async (event, context) =>{
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        await connectDatabase();


        const {name, email, password} = JSON.parse(event.body);

        let user = {
            name,
            email,
            password
        
        }

        user = await User.create(user);


        return {
            statusCode: 201,
            body: JSON.stringify(user)
        } 
    }catch (error){
            return {
                statusCode: error.statusCode || 500,
                body: JSON.stringify({error : error.message})
            }
        }   
} 