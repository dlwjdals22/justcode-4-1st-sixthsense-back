const res = require('express/lib/response')
const dormListService = require('../services/dormListServiceHN')

const getDormitories = async(req, res) => {
    try{
        const dormitories = await dormListService.getDormitories()
        return res.status(201).json({dormitories})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    
}

const getSearchedDormitories = async(req, res) => {
    try{
        let keyword = req.param('keyword')
        if(keyword==undefined){
            keyword=""
        }
        let category = req.body
        const searchedDormitories = await dormListService.getSearchedDormitories(keyword,category)
        return res.status(201).json({searchedDormitories})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {getDormitories, getSearchedDormitories}