'use strict';
const Module = require('../models/modules.model');

exports.findAll = function(req, res) {
    Module.findAll(function(err, module) {
        console.log('controller')
        if (err)
            res.send(err);
            console.log('res', module);
            res.send(module);
    });
};

exports.create = function(req, res) {
    const new_module = new Module(req.query);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.query).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Module.create(new_module, function(err, module) {
            if (err)
                res.send(err);
                res.json({error:false,message:"Module added successfully!",data:module});
        });
    }
};

exports.findById = function(req, res) {
    Module.findById(req.params.id, function(err, module) {
        if (err)
            res.send(err);
            res.json(module);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Module.update(req.params.id, new Module(req.body), function(err, module) {
            if (err)
                res.send(err);
                res.json({ error:false, message: 'Module successfully updated' });
        });
    }
};

exports.delete = function(req, res) {
    Module.delete( req.params.id, function(err, module) {
        if (err)
            res.send(err);
            res.json({ error:false, message: 'Module successfully deleted' });
        });
};
