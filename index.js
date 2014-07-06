'use strict';

var request = require('request');
var util = require('util');
var GoogleClientLogin = require('googleclientlogin').GoogleClientLogin;

function FusionError (error){
  Error.captureStackTrace(this, FusionError)
  this.error = error;
}

util.inherits(FusionError, Error);

FusionError.prototype.toString = function () {
  return 'Fusion Error: ' + this.error;
}

function Fusion (options) {
  if(!options || !options.apiKey)
    throw new FusionError('Must have API Key to use Fusion Tables');
  this.apiKey = options.apiKey;
  this.baseUrl = 'https://www.googleapis.com/fusiontables/v1/';
  this.googleAuth = '';

  var self = this;

  function get (url, callback){
    //if(!self.googleAuth)
      //throw new FusionError('Must use fusion.clientLogin(username, password) to use Fusion Tables');
    var reqObject = {
      url: url,
      headers: {
        'Authorization': 'GoogleLogin auth='+self.googleAuth
      }
    }
    request.get(reqObject, function (err, res, data){
      if(err){
        return callback(err);
      } else {
        try {
          data = JSON.parse(data);
          if(data.error || data.errors){
            return callback(data.errors || data.error);
          } else {
            return callback(null, data);
          }
        } catch(err){
          return callback(err);
        }
      }
    });
  }

  function post (url, param, callback){
    //if(!self.googleAuth)
      //throw new FusionError('Must use fusion.clientLogin(username, password) to use Fusion Tables');
    var body = JSON.stringify(param);
    var reqObject = {
      url: url,
      body: body,
      headers: {
        'Authorization': 'GoogleLogin auth='+self.googleAuth
      }
    }

    request.post(reqObject, function (err, res, data){
      if(err){
        return callback(err);
      } else {
        try {
          data = JSON.parse(data);
          if(data.error || data.errors){
            return callback(data.errors || data.error);
          } else {
            return callback(null, data);
          }
        } catch(err){
          return callback(err);
        }
      }
    });
  }

  //Client Login
  this.clientLogin = function (username, password){
    var googleAuth = new GoogleClientLogin({
      email: username,
      password: password,
      service: 'fusiontables',
      accountType: GoogleClientLogin.accountTypes.google
    });

    googleAuth.on(GoogleClientLogin.events.login, function(){
      self.googleAuth = googleAuth.getAuthId();
      console.log('auth ', self.googleAuth);
    });

    googleAuth.login();
  }


  this.tables = {};

  //GET tables
  this.tables.list = function (callback){
    var url = self.baseUrl+'tables?key='+self.apiKey;
    get(url, callback);
  }

  this.tables.table = function (tableId, callback){
    var url = self.baseUrl+'tables/'+tableId+'?key='+self.apiKey;
    get(url, callback);
  }

  this.tables.columns = function (tableId, callback){
    var url = self.baseUrl+'tables/'+tableId+'/columns?key='+self.apiKey;
    get(url, callback);
  }

  this.tables.column = function (tableId, columnId, callback){
    var url = self.baseUrl+'tables/'+tableId+'/columns/'+columnId+'?key='+self.apiKey;
    get(url, callback);
  }

  this.tables.templates = function (tableId, callback){
    var url = self.baseUrl+'tables/'+tableId+'/templates?key='+self.apiKey;
    get(url, callback);
  }

  this.tables.template = function (tableId, templateId, callback){
    var url = self.baseUrl+'tables/'+tableId+'/templates/'+templateId+'?key='+self.apiKey;
    get(url, callback);
  }

  this.tables.styles = function (tableId, callback){
    var url = self.baseUrl+'tables/'+tableId+'/styles?key='+self.apiKey;
    get(url, callback);
  }

  this.tables.style = function (tableId, styleId, callback){
    var url = self.baseUrl+'tables/'+tableId+'/styles/'+styleId+'?key='+self.apiKey;
    get(url, callback);
  }

  //POST tables
  this.tables.create = function (callback){
    var url = self.baseUrl+'tables?key='+self.apiKey;
    console.log(url);
    post(url, '', callback);
  }

  this.query = {};



}

module.exports = Fusion;