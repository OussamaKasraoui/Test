"use strict";
const dbConn = require("./../../config/db.config");
const bcrypt = require("bcrypt");

//user object   :   ID, nom complet, cin, date naissance, filière, date d'inscription, modules
var User = function (user) {
  this.ID = user.ID;
  this.nom_complet = user.nom_complet;
  this.email = user.email;
  this.password = user.password;
  this.date_inscription = user.date_inscription;
};

User.create = function (newUser, result) {
  // Hashing Password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      //newUser.password = hash;

      var _user = {
        nom_complet: newUser.nom_complet,
        email: newUser.email,
        password: hash,
        date_inscription: newUser.date_inscription,
      };

      //   newUser
      //     .save()
      //     .then(user => res.json(user))
      //     .catch(err => console.log(err));
      dbConn.query("INSERT INTO Users set ?", _user, function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.log(res.insertId);
          result(null, res.insertId);
        }
      });
    });
  });
};

User.findById = function (id, result) {
  dbConn.query("Select * from Users where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findOne = function (email, result) {
  dbConn.query(
    "Select * from Users where email = ? ",
    email,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.findAll = function (result) {
  dbConn.query("Select * from Users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Users : ", res);
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE Users SET " +
      "nom_complet=?," +
      "email=?," +
      "password=?," +
      "date_inscription=?" +
      "WHERE id = ?",
    [user.nom_complet, user.email, user.password, user.date_inscription, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

User.delete = function (id, result) {
  dbConn.query("DELETE FROM Users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
