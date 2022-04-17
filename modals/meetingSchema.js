const { strict } = require('jade/lib/doctypes');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var meetingSchema = new Schema({
    name: {
        type: String
    },
    to:{
        type: Schema.Types.ObjectId,
        ref: "users_Schema",
    },
    from:{
        type: Schema.Types.ObjectId,
        ref: "users_Schema",
    },
    startTime:{
      type:String
    },
    endTime:{
      type:String
    }
    
});

var meeting_exp = mongoose.model('meetingSchema', meetingSchema);

module.exports = meeting_exp;