'use strict';
var dbConn = require('./../../config/db.config');

//Professeur object     :   ID, matricule, nom complet, date d'inscription, Modules enseigné
var professeur = function(professeur){
  this.ID               = professeur.ID;
  this.matricule        = professeur.matricule;
  this.nom_complet      = professeur.nom_complet;
  this.date_inscription = professeur.date_inscription;
  this.Modules_enseigne = professeur.Modules_enseigne;
};


professeur.create = function (newProfesseur, result) {
    dbConn.query("INSERT INTO professeurs set ?", newProfesseur, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    }
    );
};

professeur.findById = function (matricule, result) {
    dbConn.query("Select * from professeurs where matricule = ? ", matricule, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

professeur.findAll = function (result) {
    dbConn.query("Select * from professeurs", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('professeurs : ', res);
            result(null, res);
        }
    });
};

professeur.update = function(id, professeur, result){
    dbConn.query("UPDATE professeurs SET "+
    "matricule=?,"+
    "nom_complet=?,"+
    "date_inscription=?,"+
    "Modules_enseigne=?,"+
    "WHERE id = ?", [
        professeur.matricule,
        professeur.nom_complet,
        professeur.date_inscription,
        professeur.Modules_enseigne,
        id
    ], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }else{
                result(null, res);
            }
    });
};

professeur.delete = function(id, result){
    dbConn.query("DELETE FROM professeurs WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= professeur;