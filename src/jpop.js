;(function($) {

  function jPop(el, options) {
    var defaultOptions = {
      form     : null,
      type     : "banner",
      position : "top",
      style    : false,
      zindex   : 8675309,
      show     : false,
      delay    : 500,
      scroll   : false,
      title    : "Subscribe to our email list",
      button   : "Submit",
      thanks   : "Thanks"
    };

    this.el      = el;
    this.loaded  = false;
    this.options = $.extend(defaultOptions, options);
    this.message = {
      incorrectType: "Incorrect type set. Check your options.",
      incorrectForm: "You must pass your form id as an option"
    };
    this.output  = { error: false, message: this.options.thanks };
  }

  jPop.prototype.run = function() {
    if(this.options.form !== null) {
      switch(this.options.type) {
        case("banner"):
          this.loadBanner();
          break;
        case("popover"):
          this.loadPopOver();
          break;
        default:
          console.log(this.message.incorrectType);
          break;
      }
    } else {
      console.log(this.message.incorrectForm);
    }
  };

  jPop.prototype.loadListeners = function() {
    var self = this;

    $('body').on('submit', 'form#jpop', function(e) {
      var data = $(this).serialize();

      e.preventDefault();
      self.verifyData();

      if(self.output.error === false) {

      } else {
        $('#jpop-error').empty().append('<p>' + self.output.message + '</p>');
      }
    });

    $('body').on('click', '#jpop-dismiss', function(e) {
      var type = $(this).data('type');
    });
  };

  jPop.prototype.verifyData = function() {
    var $email = $('#jpop-email'),
        regex  = /\S+@\S+\.\S+/;

    if($email.val() === "") {
      this.output = { error: true, message: this.message.emptyEmail };
    }

    if(false === regex.test($email.val())) {
      this.output = { error: true, message: this.message.invalidEmail };
    }
  };

  jPop.prototype.inject = function(markup) {
    var self = this, delay, clear;

    if(this.options.show) {
      this.el.append(markup);
      this.loaded = true;
    } else if(this.options.scroll) {
      $(window).on("scroll mousewheel", function() {
        if(!self.loaded) {
          self.el.append(markup);
          self.loaded = true;
        }
      });
    } else {
      delay = setInterval(function() {
        self.el.append(markup);
        self.load = true;
        clear();
      }, this.options.delay);

      clear = function() {
        clearInterval(delay);
      };
    }
  };

  jPop.prototype.submitForm = function() {
    // Ajax submission here
  };

  jPop.prototype.loadBanner = function() {
    var markup = this.htmlBanner();

    this.inject(markup);
  };

  jPop.prototype.loadPopOver = function() {
    var markup = this.htmlPopOver();

    this.inject(markup);
  };

  jPop.prototype.htmlBanner = function() {
    var animation = this.options.position === "top" ? "slideInDown" : "slideInUp";

    return [
      '<div id="jpop-banner" data-type="banner" class="jpop-banner animated '+ animation +'" style="position:fixed;z-index:' + this.options.zindex + ';width:100%;left:0;right:0;' + this.options.position + ':0;">',
        '<div class="jpop-left">',
          '<h1 class="jpop-cta">' + this.options.title + '</h1>',
        '</div>',
        '<div class="jpop-right">',
          this.htmlForm(),
        '</div>',
      '</div>'
    ].join("\n");
  };

  jPop.prototype.htmlPopOver = function() {
    return [
      '<div id="jpop-popover" data-type="popover" class="jpop-popover" style="position:fixed;z-index:' + this.options.zindex + ';top:0;right:0;bottom:0;left:0">',
        '<div class="jpop-content">',
          '<h1 class="jpop-cta">' + this.options.title + '</h1>',
          this.htmlForm(),
        '</div>',
      '</div>',
      '<div class="jpop-backdrop"></div>'
    ].join("\n");
  };

  jPop.prototype.htmlForm = function() {
    return [
      '<form id="jpop" role="form" class="jpop-form">',
        '<label class="sr-only" for="jpop-email">Email</label>',
        '<input id="jpop-email" name="email" placeholder="email" required>',
        '<div id="jpop-error" class="jpop-error"></div>',
        '<button class="btn btn-default" type="submit">' + this.options.button + '</button>',
      '</form>'
    ].join("\n");
  };

  $.fn.jpop = function(options) {
    var jpop = new jPop(this, options);
    jpop.run();
  };

})(jQuery);
