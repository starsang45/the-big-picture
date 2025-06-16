const mongoose = require('mongoose');
//const { SassList } = require('sass');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const nasaSchema=  new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        minLength: 5
        //unique user name with findonein controller
       // look into hashing and Salt
    },
    password:{
        type :String,
        required:true,
        minLength : 5
    }

// schema for user authentication and password

});

// fin user ny username
nasaSchema.statics.findByCredentials = async function(username, password) {
    try {
        const user = await this.findOne({ username: username 
        });

        if (!user) {
            throw new Error('Invalid login credentials');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid login credentials');
        }
        return user;
    } catch (error) {
        throw error;
    }
};



const NasaAuth = mongoose.model('nasaAuth', nasaSchema)

module.exports = {NasaAuth}
//mongoose.model('nasa', nasaSchema)//nasaAuth

