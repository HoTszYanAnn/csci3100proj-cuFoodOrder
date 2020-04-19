// JavaScript source code
var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connection();

var MenuSchema = mongoose.Schema({
    menuName: { type: String, required: true, unique: true },
    menuList: { type: String, required: true, unique: true },
    price: {type: Number, required: true}
});

var Menu = mongoose.model('Menu', MenuSchema);

app.post('/catalog/menus/createMenu', function (req, res) {
    var menu = new Menu({
        menuName: req.body['menuName'],
        menuList: req.body['menuList'],
        price: req.body['price']
    });
    restaurantId = req.params['restaurant_id'];
    menu.save(function (err) {
        try {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Successfully create a menu.");
            }
        }
        catch (err) {
            res.send("Failed to create a menu.");
        }
    });
});

app.post('/catalog/menus/updateMenu', function (req, res) {
    var menu = new Menu({
        menuName: req.body['menuName'],
        menuList: req.body['menuList'],
        price: req.body['price']
    });
    menuId = req.params['menu_id'];
    menu.findOneAndUpdate({ "_id": menuId }, { $set: menu }, function (err, result) {
        try {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Successfully update a menu.");
            }
        }
        catch (err) {
            res.send("Failed to update a menu.");
        }
    });
});

app.get('/catalog/menus/displayMenu', function (req, res) {
    menuId = req.params['menu_id'];
    Menu.findOne({ "_id": menuId }, function (err, menu) {
        try {
            if (err) {
                res.send(err);
            }
            else {
                res.send("This is: " + menu.menuName + "<br>\n" + "Menu list: " + menu.menuList + "<br>\n" + "Price: " + menu.price);
            }
        }
        catch (err) {
            res.send("There is no such menu.");
        }
    });
});

app.post('/catalog/menus/deleteMenu', function (req, res) {
    var menu = new Menu({
        menuName: req.body['menuName'],
        menuList: req.body['menuList'],
        price: req.body['price']
    });
    menuId = req.params['menu_id'];
    menu.findOneAndDelete({ "_id": menuId }, { $set: menu }, function (err, result) {
        try {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Successfully delete a menu.");
            }
        }
        catch (err) {
            res.send("Failed to delete a menu.");
        }
    });
});

app.listen(3000);
