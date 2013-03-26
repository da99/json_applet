
var _     = require('underscore')
, assert  = require('assert')
, Ok      = require('ok_slang').Ok
, cheerio = require('cheerio');
;


describe( 'ok_slang', function () {

  describe( '.to_app', function () {

    it( 'returns a string', function () {
      var html = [{
        form: [
          {text_box: ['my_name', "enter name", "one line"] } ]
      }];
      var r = Ok.to_app(html).html;
      assert.equal(r, "<form><input id=\"my_name\" name=\"my_name\" type=\"text\">enter name</input></form>");
    });

    it( 'throws error if invalid chars in name', function () {
      var err = null;
      var html = [{
        form: [
          {text_box: ['my name', "enter wrong name", "one line"] } ]
      }];

      try { Ok.to_app(html).html; }
      catch (e) { err = e; }

      assert.equal(err.message, "Invalid chars in text_box id: my name");
    });

    it( 'throws error if unknown element', function () {
      var err = null;
      var html = [{
        form: [
          {text_boxy: ['my_name', "enter name", "one line"] } ]
      }];

      try { Ok.to_app(html).html; }
      catch (e) { err = e; }

      assert.equal(err.message, "Unknown element: text_boxy");
    });

  }); // === end desc

  describe( '{button: ["name", "text", ...]}', function () {

    it( 'creates a HTML button tag', function () {
      var html = [{button: ['my_button', 'Send']}];
      var r    = Ok.to_app(html).html;
      assert.equal(r, '<button id="my_button">Send</button>');
    });
  }); // === end desc

  describe( '{link: ["name", "link", "text"]}', function () {

    it( 'accepts 3 args: name, link, text', function () {
      var html = [{link: ['my_link', 'http://www.test.com/', 'My Link']}];
      var r    = Ok.to_app(html).html;
      var a    = cheerio.load(r)('a');
      assert.equal( a.attr('id')   , 'my_link');
      assert.equal( a.attr('href') , "http://www.test.com/");
      assert.equal( a.text()       , "My Link" );
    });

    it( 'accepts 2 args: link, text', function () {
      var html = [{link: ['http://www.test.com/', 'My Link']}];
      assert.equal(Ok.to_app(html).html, '<a href="http://www.test.com/">My Link</a>');
    });

    it( 'normalizes href', function () {
      var html = [{link: ['hTTp://www.test.com/', 'My Link']}];
      assert.equal(Ok.to_app(html).html, '<a href="http://www.test.com/">My Link</a>');
    });

    it( 'raises error if link is invalid', function () {
      var html = [{link: ['http://www.te\x3Cst.com/', 'My Link']}];
      var err  = null;
      try { Ok.to_app(html).html; }
      catch (e) { err = e; }
      assert.equal(err.message, 'Invalid link address: http://www.te<st.com/');
    });

  }); // === end desc

  describe( 'generating JavaScript', function () {

    it( 'generates JavaScript', function () {
    });

  }); // === end desc

}); // === end desc


