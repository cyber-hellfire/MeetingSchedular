var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var users_Schema = new Schema({
    full_Name: {
        type: String
    },
    is_Active:{
        type:Boolean,
        default:true
    }
    
}, {
    timestamps: true
});

var user_exp = mongoose.model('users_Schema', users_Schema);

module.exports = user_exp;