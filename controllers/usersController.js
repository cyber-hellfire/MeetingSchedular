//---------------------------------importing models------------------------------------
const userModel = require('../modals/usersSchema');
const meetingModel = require('../modals/meetingSchema');
const moment = require('moment');

//-------------------------------------------------------------------------------------------
var meetingScheduleChecker =  (async(data)=>{

    let result = await meetingModel.find({to:data.to});
    let scheduledStart =  moment(result[0].startTime).format('YYYY-MM-DD hh:mm');
    let scheduledEnd =  moment(result[0].endTime).format('YYYY-MM-DD hh:mm');
    let toBeScheduledStart = moment(data.startTime ).format('YYYY-MM-DD hh:mm');
    let toBeScheduledEnd = moment(data.endTime ).format('YYYY-MM-DD hh:mm');

    return new Promise(async (resolve, reject) => {
        let resulstart = moment(toBeScheduledStart,'YYYY-MM-DD hh:mm').isBetween(scheduledStart, scheduledEnd, null, '[]');
        let resulend = moment(toBeScheduledEnd,'YYYY-MM-DD hh:mm').isBetween(scheduledStart, scheduledEnd, null, '[]');
        if(resulstart == false && resulend == false){
            resolve(resulstart)
        }
        else{
            resolve(true)
        }
    }) 
});
//---------------------------------------------------------------------------------------------
exports.createUser = async (req,res,next)=>{     
    userModel.create(req.body)
     .then((data)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(data);
 
     },(err)=>next(err))
     .catch((err)=>next(err));
 };

 exports.getAllUsers = async (req,res,next)=>{     
    userModel.find({})
     .then((data)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(data);
 
     },(err)=>next(err))
     .catch((err)=>next(err));
 };

//---------------------------meeting functions-----------------------
 exports.createMeeting = async (req,res,next)=>{
    
   let result = await meetingScheduleChecker(req.body);
   if(result == false){
    meetingModel.create(req.body)
    .then((data)=>{
                res.statusCode=200;
                res.setHeader("Content-Type","application/json");
                res.json(data);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
        else
        {
    res.statusCode=402;
    res.setHeader("Content-Type","application/json");
    res.json({'error':'Meeting slot unavalible'});
    }
   };


 exports.getUsersCallender = async (req,res,next)=>{     
    meetingModel.find({toObject:req.params.user_id})
     .then((data)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(data);
 
     },(err)=>next(err))
     .catch((err)=>next(err));
 };

 

 