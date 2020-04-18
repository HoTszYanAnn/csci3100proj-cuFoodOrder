var express = require('express');
var router = express.Router();
var Menu = require('../models/menu');
var authorized = require('../middlewares/token_check'); //middleware for authentication
var multer = require('multer');
var path = require('path');


//receving file storage setting
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploadedMenuImages/')
    },
    filename: function(req, file, callback){
        var extension = path.extname(file.originalname);
        callback(null,  req.body.menuName+ '_' + req.body.dishName + extension);
    },
    fileFilter: function(req, file, callback){
        var imageType = file.mimetype;
        if((imageType !== 'image/png') || (imageType !== 'image/jpg') || (imageType !== 'image/jpeg')) {
            return callback(res.json({process: 'failed', details: 'only png/jpg/jepg format is accepted'}), false);
        }
        callback(null, true);
    }
});


//apply the file setting above
var upload = multer({storage:storage}).single('file');
// Receive uploaded image for the menu saved in the server
// using multer module, a kind of mode.js middleware for handling "multipart/form-data" header request
//i.e. we use multer to handle the uploaded image saving request...
//front-end needs 3 parameters: req.body.menuName, req.body.dishName, the image(uploading image should be the last order)
router.post('/upload_photo', authorized, upload, function(req, res){  
    return res.json({process: 'success' , image_path: res.req.file.path, image_name: res.req.file.filename});
});
//frontend can use axios.post(...).then(callback)


// restaurants can upload their menus to the database through this function
// authorized is the middleware for authenticating the user's login status
router.post('/upload_menu', authorized, function(req, res){
    var menu = new Menu(req.body);

    menu.save(function(err, menuData){
        if(err) 
            return res.json({process: "failed", err});
        else
            return res.status(200).json({process: "success", details: 'added one 1 new menu', menuData});    
    });
});


//display all the menus in database
//further improvement will be displaying this page with limits up to 8 menus per page
//then fetch the the remaining data with the additional request...
//every user including not registered one can use this function, so no 'authorized' middlware is needed.
router.post('/display_menu', function(req, res){
    Menu.find().populate('restaurantName', 'username introduction').exec(function(err, allMenuData){
        if(err)
            return res.json({process: "failed", err});
        else          
            return res.json({process: "success", allMenuData});
    });
});


//update_menu
//by default, mongoose returns the doc before the update
//use the option {new: true} can help set the function return the doc after updates in the query
router.post('/update_menu', authorized, function(req, res){

    var updateKeysAndValues = {};

    //below function used to assign keys and values to the object
    //first parameter is target; second one is the source for copy
    Object.assign(updateKeysAndValues, req.body);

    // console.log(updateKeysAndValues); //debug

    Menu.findOneAndUpdate({_id: req.body._id}, updateKeysAndValues, function(err, beforeUpdateMenuData){
        if(err)
            return res.json({process: "failed", err});
        else 
            return res.json({process: "success", beforeUpdateMenuData, newChange: req.body});
    });
});


//delete certain unwanted product
router.post('/delete_menu', authorized, function(req, res){
    Menu.findOneAndDelete({_id: req.body._id}, function(err, deletedMenuData){
        if(err)
            return res.json({process: "failed", err});
        else 
            return res.json({process: "success", deletedMenuData});
    });
});


//likes increment
router.post('/likes_menu_plus', authorized, function(req, res){

    Menu.findOneAndUpdate({_id: req.body._id}, { $inc: { likes : +1 }}, function(err, beforePlus){
        if(err)
            return res.json({process: "failed", err});
        else 
            return res.json({process: "success", beforePlus});
    });
});


//likes decrement
router.post('/likes_menu_minus', authorized, function(req, res){

    Menu.findOneAndUpdate({_id: req.body._id}, { $inc: { likes : -1 }}, function(err, beforeMinus){
        if(err)
            return res.json({process: "failed", err});
        else 
            return res.json({process: "success", beforeMinus});
    });
});


module.exports = router;