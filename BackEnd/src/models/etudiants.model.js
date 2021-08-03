'use strict';
var dbConn = require('./../../config/db.config');

//Etudiant object   :   ID, nom complet, cin, date naissance, filière, date d'inscription, modules
var Etudiant = function(etudiant){
  this.ID               = etudiant.ID;
  this.nom_complet      = etudiant.nom_complet;
  this.cin              = etudiant.cin;
  this.date_naissance   = etudiant.date_naissance;
  this.filiere          = etudiant.filiere;
  this.date_inscription = etudiant.date_inscription;
  this.modules          = etudiant.modules;
};


Etudiant.create = function (newEtudiant, result) {
    dbConn.query("INSERT INTO etudiants set ?", newEtudiant, function (err, res) {
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

Etudiant.findById = function (cin, result) {
    dbConn.query("Select * from etudiants where cin = ? ", cin, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Etudiant.findAll = function (result) {
    dbConn.query("Select * from etudiants", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Etudiants : ', res);
            result(null, res);
        }
    });
};

Etudiant.update = function(id, etudiant, result){
    dbConn.query(
        "UPDATE etudiants SET "+
        "nom_complet=?,"+
        "cin=?,"+
        "date_naissance=?,"+
        "filiere=?,"+
        "date_inscription=?,"+
        "modules=?"+
        "WHERE id = ?", 
        [
            etudiant.nom_complet,
            etudiant.cin,
            etudiant.date_naissance,
            etudiant.filiere,
            etudiant.date_inscription,
            etudiant.modules,
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

Etudiant.delete = function(id, result){
    dbConn.query("DELETE FROM etudiants WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= Etudiant;