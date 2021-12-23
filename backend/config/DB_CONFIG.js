const mongoose = require('mongoose');

module.exports = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,
        //useFindAndModify:false
    })
    console.log('Connected to Database');
    }
    catch(err){
        console.error(`Error Connecting DB`);
        process.exit(1);
    }
}