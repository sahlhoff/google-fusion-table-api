var Fusion = require('../index');
var should = require('should');

var fusion = new Fusion();

fusion.list(function (err, data){
  if(err){console.log(err)}
  console.log(data);
})