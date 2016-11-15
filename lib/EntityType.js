const assert = require('assert');

const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

function EntityType(metadata, xml) {
  this._metadata = metadata;
  this._key = null;
  this.Properties = {};
  var name = xml.attr('Name').value();
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element')
    {
      this.parseElement(children[i], name);
    }
    else
    {
      throw new Error('Unknown element type in EntityType '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  if(this._key !== null)
  {
    var propNames = this._key.find('.//*[local-name()="PropertyRef"]/@Name');
    for(var i = 0; i < propNames.length; i++)
    {
      var name = propNames[i].value();
      if(this[name] !== undefined) {
        this[name].IsKey = true;
      }
    }
  }
  delete this._key;
  return this;
}

EntityType.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Key':
      if(this._key !== null) {
        throw new Error('More than one key on EntityType '+entityName);
      }
      this._key = element;
      break;
    case 'Property':
      var name = element.attr('Name').value();
      this.Properties[name] = new Property(this, element);
      break;
    case 'NavigationProperty':
      var name = element.attr('Name').value();
      this.Properties[name] = new NavigationProperty(this, element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

EntityType.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'BaseType':
      this.BaseType = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EntityType '+entityName);
      break;
  }
}

module.exports = EntityType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */