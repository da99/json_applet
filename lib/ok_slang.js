
var _     = require('underscore')
_s        = require('underscore.string')
unhtml    = require('unhtml')
special   = require('special-html')
HTML_E    = require('entities')
;

var Ok = exports.Ok = function () {};

var ESCAPE = Ok.escape = function (str) {
  return special( _s.escapeHTML( _s.unescapeHTML( HTML_E.decode( str , 2) ) ) );
};

Ok.escape_uri = function (s) {
  return s;
};

Ok.throw = function (err_or_msg) {
  var err = (_.isString(err_or_msg)) ?
    (new Error(str_or_arr)) :
    err_or_msg;

  throw err;
};

Ok.new = function (str_or_arr, on_err) {
  var arr = null;

  if (_.isString(str_or_arr)) {
    arr = JSON.parse(str_or_arr);
  }

  if (_.isArray(str_or_arr)) {
    arr = str_or_arr;
  }

  if (!arr) {
    var msg = "Value must be either string or array: " + JSON.stringify(str_or_arr);
    return this.throw(on_err, new Error(msg));
  }

  if (!_.isArray(arr)) {
    var msg = "Value must be an array: " + JSON.stringify(arr);
    return this.throw(on_err, new Error(msg));
  }

  var ok = new Ok;
  ok.code = arr;
  return ok;
};

Ok.prototype.throw = function (on_err, err) {
  if (on_err)
    return on_err(err);
  return Ok.throw(err);
};

Ok.prototype.to_html = function () {
  var me = this;
  _.each(this.code, function (val, i) {
    
  });
  return this.code;
};


