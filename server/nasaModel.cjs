const mongoose = require('mongoose');
const schema = mongoose.Schema;

const nasaSchema=  new Schema({
    username:{
        type: string,
        requires: true,
    },
    password:{
        type :number,
        requires:true
    }

// schema for user authentication and password

})

const NasaAuth = mongoose.model('nasaAut', nasaSchema)

module.export = {NasaAuth}
//mongoose.model('nasa', nasaSchema)//nasaAuth

