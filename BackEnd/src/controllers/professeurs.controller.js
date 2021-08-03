'use strict';
const Professeur = require('../models/professeurs.model');

exports.findAll = function(req, res) {
    Professeur.findAll(function(err, professeur) {
        console.log('controller')
        if (err)
            res.send(err);
            console.log('res', professeur);
            res.send(professeur);
    });
};

exports.create = function(req, res) {
    const new_etudiant = new Professeur(req.query);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.query).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Professeur.create(new_etudiant, function(err, professeur) {
            if (err)
                res.send(err);
                res.json({error:false,message:"Professeur added successfully!",data:professeur});
        });
    }
};

exports.findById = function(req, res) {
    Professeur.findById(req.params.id, function(err, professeur) {
        if (err)
            res.send(err);
            res.json(professeur);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Professeur.update(req.params.id, new Professeur(req.body), function(err, professeur) {
            if (err)
                res.send(err);
                res.json({ error:false, message: 'Professeur successfully updated' });
        });
    }
};

exports.delete = function(req, res) {
    Professeur.delete( req.params.id, function(err, professeur) {
        if (err)
            res.send(err);
            res.json({ error:false, message: 'Professeur successfully deleted' });
        });
};
