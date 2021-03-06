

Disclaimer.
-------------

This is not ready yet. Come back in 2014.

Why should I love JSON applets?
-------------------------------

Do you want to allow others to script your apps? In other words: turn your apps into a
platform the quick & easy way? And... you want them sandboxed? Then try JSON applets.

Do you want to create a simple to use declarative language and pass it around
using JSON? Then try JSON applets.

Example:
---------

Your app users send you this JSON:

    [
      "form", ["my_dom_id", "post", "http://my_url.something/"], [
        "text_input", [ "dom_id_2", {lines: 1} ], [
          "Input your name here."
        ],
        "button", [ "Save" ],
        "on_click", [ "submit_form" ]
      ]
    ]

You then process the above into HTML and JS... using Ruby, Python, [Factor](http://factorcode.org/), etc.

Alternatives:
-------------

* [Adsafe](http://www.adsafe.org/)

The Standard
-------------------------

The starting point is an array:

    [ "print", ["hello", "world"] ]

You have to define what "print" does.

Function calls: A string followed by one or more arrays or object (ie {name: vale}).

    [
       "remove" , ["my_form", "my_spouse"], ["some", "other", "args", [ 1, 2, 3 ]],
       "add"    , {right: 1, left: "2"}
    ]

Any string followed by another string is considered a function call without arguments:

    [
       "my_func_with_no_args",
       "my_func_with_args", [ 1, 2, 3 ]
    ]

There are no plans for variables or methods because JSON applet because
there are closer in pedigree to SQL/DSLs/POLs than to a full scripting/prog. lang.

The nodejs/npm implementation:
------------------------------

    npm install json_applet (Currently, it's not on the npm yet.)

    var Applet = require('json_applet').Applet;
    var source = [
      "form", ["my_form"], [
        "text_input", [ "my_name", {lines: 1} ], [
          "Input your name here."
        ],
        "button", [], [ "Save" ],
        "on_click", [ "submit_form" ]
      ]
    ];

    var HTML = Applet(source);

    HTML.def('form', function (call_meta, args) {
      call_meta.name   // 'form'
      call_meta.prev   // the previous func call and args: [name, array1, array2, ...]
      call_meta.curr   // the current func call: ['form', array1, array2]
      call_meta.data   // an object you can use to save and pass around data to other
                       //   func calls.
      call_meta.app.run(args_array); // compile args as if it were a sub-call_meta.
      return "<form> ... </form>";
    });

    HTML.def_in('form', 'text_input', my_func) // "text_input" only allowed inside a "form".
    HTML.def_parent('form', my_func)           // A "form" can not be inside another "form".
    HTML.after_run(some_func);                 // See below: "Events".
    HTML.run();                                // returns itself.
    HTML.run().results                         // the results of your applet.
    HTML.run().error                           // any error.

If there are any errors, they are returned from `.run` as:

    { error: new Error("the msg") }


Events
------

If you want to process your results after calling `.run()`, just add different
callbacks using `.after_run()`

    My_Applet.after_run(function (app) {
      var results = app.results;
      // do something...
      app.results = my_new_results;
    });

    My_Applet.after_run(function (app) {
      // do something...
      app.results = my_other_new_results;
    });

Now, when you call `.run()`, the results are run through the callbacks
you defined in `.after_run`:

    My_Applet.run().results; // results are processed through the callbacks.

There are no more "events" other than `after_run`.

History
-------

Formerly called: ok\_slang.


A better way:
------------

You have a client (PC, virtual machine, tablet, etc.). You want to
script it using Haskell, but the machine only partys with JavaScript.
How do you solve it?
Make the problem more complicated... What if you have 1 billion people who all use
1 million different languages... and they all want to run code on the machine...

`The Alan Kay Way`: Let the client run
binary code using a sandbox. Then, collect the output
and present the result to the USER or to another process/VM.

The sandbox can decide how much CPU/RAM/etc the binary code can have, how much
access to the screen/speakers/etc it gets, etc.

This way, you can run almost any past/present/future language on the client securely.
This is of course too
radical and not common (despite being Oper. Sys 101).
(And no... JS
ByteArray/ASM.js is not the answer. It's better than nothing, but not what AK was thinking
about.)

For more on Alan Kay, go to youtube and vimeo. His 30+ min lectures are heavenly.


The End
-------

... for now.









