var fs = require("fs");

XMLHttpRequest = function() {
  var self = this,
      headers = {},
      url;

  // TODO request headers
  // TODO handle file system errors

  self.open = function(m, u, a) {
    url = u;
    self.send = a ? read : readSync;
  };

  self.setRequestHeader = function() {};
  self.overrideMimeType = function() {};

  function read() {
    fs.readFile(url, "binary", function(e, d) {
      if (e) {
        self.status = 404; // assumed
      } else {
        self.status = 200;
        self.responseText = d;
        headers["Content-Length"] = d.length;
      }
      self.readyState = 4;
      if (self.onreadystatechange) self.onreadystatechange();
    });
  }

  function readSync() {
    try {
      var d = fs.readFileSync(url, "binary");
      self.status = 200;
      self.responseText = d;
      headers["Content-Length"] = d.length;
    } catch (e) {
      self.status = 404; // assumed
    }
    self.readyState = 4;
    if (self.onreadystatechange) self.onreadystatechange();
  }

  self.getResponseHeader = function(n) {
    return headers[n];
  };
};
