const mongoose = require('mongoose');
//const { SassList } = require('sass');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

//user schema
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

//hash password befor saving
nasaSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to compare passwords
nasaSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// static method for login validation
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

/* Quote Schema */

const quoteSchema = new Schema({
    quote: {
        type: String,
        default: 'some quote'
    },
    author: {
        type: String,
        default: 'Unknown'
    }
})

const Quote = mongoose.model('quote', quoteSchema)

module.exports = {
    NasaAuth,
    Quote
};


