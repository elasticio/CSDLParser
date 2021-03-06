var csdl = require('../index');

/*Redfish uses CSDL very differently, let's make sure we can also parse Redfish style CSDL*/
module.exports.redfish = function(assert) {
  csdl.parseMetadataFile(__dirname + '/fixtures/Redfish/Resource_v1.xml', {}, function(error, metadata) {
    assert.ifError(error);
    if(error) {
      console.log(error);
    }
    //console.log(metadata);
    assert.done();
  });
}

module.exports.redfishNoNetwork = function(assert) {
  var options = {
    useLocal: __dirname + '/fixtures/Redfish/',
    useNetwork: false};
  csdl.parseMetadataFile(__dirname + '/fixtures/Redfish/Resource_v1.xml', options, function(error, metadata) {
    assert.ifError(error);
    if(error) {
      console.log(error);
    }
    //console.log(metadata);
    assert.done();
  });
}

/*
var assert = require('assert');
assert.done = function() {};
module.exports.redfishNoNetwork(assert);*/
