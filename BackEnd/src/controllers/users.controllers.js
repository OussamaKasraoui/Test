'use strict';

// Load input validation
const validateRegisterInput = require("./../validation/register");
const validateLoginInput    = require("./../validation/login");

const User = require('../models/user.model');

exports.findAll = function(req, res) {
    User.findAll(function(err, user) {
        console.log('controller')
        if (err)
            res.send(err);
            console.log('res', user);
            res.send(user);
    });
};

exports.create = function(req, res) {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.query);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const new_user = new User(req.query);
    
    //console.log("\n\ninsert new Module : \n"+ JSON.stringify(req.query))



    //handles null error
    if(req.body.constructor === Object && Object.keys(req.query).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.create(new_user, function(err, user) {
            if (err)
                res.send(err);
                res.json({error:false,message:"user added successfully!",data:user});
        });
    }
};

exports.findOne = function(req, res){
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
            id: user.id,
            nom_complet: user.nom_complet
            };

            // Sign token
            jwt.sign(
            payload,
            keys.secretOrKey,
            {
                expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
                res.json({
                success: true,
                token: "Bearer " + token
                });
            }
            );
        } else {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
        });
    });
}

exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
            res.json(user);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.update(req.params.id, new User(req.body), function(err, user) {
            if (err)
                res.send(err);
                res.json({ error:false, message: 'user successfully updated' });
        });
    }
};

exports.delete = function(req, res) {
    User.delete( req.params.id, function(err, user) {
        if (err)
            res.send(err);
            res.json({ error:false, message: 'user successfully deleted' });
        });
};
