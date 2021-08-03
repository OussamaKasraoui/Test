'use strict';
var dbConn = require('./../../config/db.config');

//modules object    :   ID, nom du module, coefficient
var Modules = function(etudiant){
  this.ID              = etudiant.ID;
  this.nom_module      = etudiant.nom_module;
  this.coefficient     = etudiant.coefficient;
};


Modules.create = function (newModule, result) {
    dbConn.query("INSERT INTO Modules set ?", newModule, function (err, res) {
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

Modules.findById = function (nom_module, result) {
    dbConn.query("Select * from Modules where nom_module = ? ", nom_module, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Modules.findAll = function (result) {
    dbConn.query("Select * from Modules", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Modules : ', res);
            result(null, res);
        }
    });
};

Modules.update = function(id, module, result){
    dbConn.query("UPDATE Modules SET "+
        "nom_module=?,"+
        "coefficient=?,"+
        "WHERE id = ?", [
            module.nom_module,
            module.coefficient,
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

Modules.delete = function(id, result){
    dbConn.query("DELETE FROM Modules WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= Modules;