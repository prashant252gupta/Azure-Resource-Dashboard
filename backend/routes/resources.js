const axios = require('axios');
const qs = require('qs')
const express = require('express')
const router = express.Router()
const Resource = require('../models/Resource')


router.get('/get-data' , async(req,res) => {
    try{
        const subscriptions = await updateDataFromAzure()
        await Resource.deleteMany({})
        const data = await Resource.insertMany(subscriptions)
        res.send(data)
    }
    catch(err){
        res.status(400).send({error:err.message})
    }
})

async function updateDataFromAzure(){
    try{
        const options = {
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:qs.stringify({
                client_id: process.env.AZURE_CLIENT_ID,
                client_secret: process.env.AZURE_CLIENT_SECRET,
                grant_type: "client_credentials",
                redirectUri: process.env.REDIRECT_URI,
                resource: process.env.AZURE_RESOURCE,
            }),
            url:process.env.AZURE_TOKEN_URL
        }
        let response = await axios(options)
        const token = response.data.access_token
        const authorization_header = `Bearer ${token}`
        response = await axios.get(process.env.AZURE_BASE_URL, { headers: { Authorization: authorization_header } })
        let data = response.data.value
        return data
    }
    catch(err){
        console.log(err)
    }
}

module.exports = router