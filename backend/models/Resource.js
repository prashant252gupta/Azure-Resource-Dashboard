const mongoose = require('mongoose')

const ResourceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    id:{
        type:String,
        required:true
    }
})

const Resource = mongoose.model('Resource', ResourceSchema)
Resource.createIndexes({id:1})

module.exports = Resource