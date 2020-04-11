var express = require('express');
var router = express.Router();
var Inquire = require('../models/inquire');
var authorized = require('../middlewares/token_check'); //middleware for authentication


router.get('/chatHistory/:user_input_id/:cs_input_id', authorized, function(req, res){
    Inquire.find({user_id: req.params.user_input_id, cs_id: req.params.cs_input_id}).populate("user_id").populate("cs_id").then(function(err, history){
        if(err)
            return res.json({err});
        return res.json({history});
    });
});


module.exports = router;