var express = require('express');
var router = express.Router();
var Inquire = require('../models/inquire');
var authorized = require('../middlewares/token_check'); //middleware for authentication
var {findemptyroom} = require('../middlewares/chat');


router.post('/chatHistory_user', authorized, function(req, res){
    Inquire.find({user: req.body.user}, function(err, history){
        if(err)
            return res.json({process: 'failed', err});
        return res.json({process: 'success', history});
    });
});

router.post('/chatHistory_cs', authorized, function(req, res){
    Inquire.find({cs: req.body.cs}, function(err, history){
        if(err)
            return res.json({process: 'failed', err});
        return res.json({process: 'success', history});
    });
});


router.post('/empty_room', authorized, function(req, res){
    empty_room = findemptyroom();
    return res.json({process: 'success', empty_room});
});


module.exports = router;