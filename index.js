'use strict';

var request = require('request');
var util = require('util');

function Fusion (options) {
  this.baseUrl = 'https://www.googleapis.com/fusiontables/v1/query/';

  var self = this;

  function get (url, callback){
    request.get(url, function(err, res, data){
      if(err){
        callback(err);
      } else {
        try {
          data = JSON.parse(data);
          if(data.success === false){
            callback(data.errors || data.error);
          } else {
            callback(null, data);
          }
        } catch(err){
          callback(err);
        }
      }
    })
  }

  function post (url, param, callback){

  }


  this.list = function(callback){
    var url = self.baseUrl + 'tables';

    console.log('GET', url);

    get(url, callback);
  }


}

module.exports = Fusion;