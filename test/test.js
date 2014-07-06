var Fusion = require('../index');
             require('should');

var fusion = new Fusion({apiKey: 'AIzaSyAz9_gvrnxWRSgaV0rel_P4FJfEknO9Lu8'});
var tableId = '12qN6I21grayn8UyEgijv3um4vbbAiyqIk9mnxgmK';

describe('fusion.tables.table', function(){
  it('should return ', function (done){
    fusion.tables.table(tableId, function (err, data){
      if(err){console.log(err)}
      data.should.have.property('kind');
      done();
    });
  });
});

describe('fusion.tables.columns', function(){
  it('should return ', function (done){
    fusion.tables.columns(tableId, function (err, data){
      if(err){console.log(err)}
      data.should.have.property('kind');
      done();
    });
  });
});

describe('fusion.tables.column', function(){
  it('should return ', function (done){
    fusion.tables.column(tableId, '0', function (err, data){
      if(err){console.log(err)}
      data.should.have.property('kind');
      done();
    });
  });
});

describe('fusion.tables.templates', function(){
  it('should return ', function(done){
    fusion.tables.templates(tableId, function (err, data){
      if(err){console.log(err)}
      data.should.have.property('kind');
      done();
    });
  });
});

describe('fusion.tables.template ', function(){
  it('should return ', function (done){
    fusion.tables.template(tableId, '1', function (err, data){
      if(err){console.log(err)}
      data.should.have.property('kind');
      done();
    });
  });
});

describe('fusion.tables.styles ', function(){
  it('should return ', function (done){
    fusion.tables.styles(tableId, function (err, data){
      if(err){console.log(err)}
      data.should.have.property('kind');
      done();
    });
  });
});

describe('fusion.table.style ', function(){
  it('should return ', function (done){
    fusion.tables.style(tableId, '1', function (err, data){
      if(err){console.log(err)}
      data.should.have.property('kind');
      done();
    });
  });
});

describe('fusion.tables.list', function(){
  it('should return ', function (done){
    fusion.tables.list(function (err, data){
      if(err){console.log('err ', err)}
      console.log('data ', data);
      done();
    });
  });
});

describe('fusion.table.create', function(){
  it('should create a table and return ', function(done){
    fusion.tables.create(function (err, data){
      if(err){console.log(err)}
      console.log('create a table', data);
      done();
    })
  })
})
