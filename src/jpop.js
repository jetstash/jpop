;(function($) {

  function jPop(el, options) {
    var defaultOptions = {
      form     : null,
      type     : "banner",
      position : "top",
      style    : false,
      show     : false,
      delay    : 500,
      scroll   : false,
      title    : "Subscribe to our email list",
      button   : "Submit"
    };

    this.el      = el;
    this.loaded  = false;
    this.options = $.extend(defaultOptions, options);
    this.message = {
      incorrectType: "Incorrect type set. Check your options.",
      incorrectForm: "You must pass your form id as an option.",
      emptyEmail:    "Email is required to submit.",
      invalidEmail:  "Email is not a valid format."
    };
    this.output  = { error: false, message: "Submission successful." };
  }

  jPop.prototype.run = function() {
    this.loadListeners();

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

    $('body').on('submit', 'form#jpop', function() {
      var data = $(this).serialize();

      self.verifyData();

      if(self.ouput.error === false) {

      } else {
        $('#jpop-error').empty().append('<p>' + this.output.message + '</p>');
      }
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

  jPop.prototype.loadBanner = function() {
    var markup = this.htmlBanner();

    this.inject(markup);
  };

  jPop.prototype.loadPopOver = function() {
    var markup = this.htmlPopOver();

    this.inject(markup);
  };

  jPop.prototype.htmlBanner = function() {
    var html = "";

    html += '<div id="jpop-banner" class="jpop-banner" style="position:fixed;width:100%;left:0;right:0;' + this.options.position + ':0;">';
    html += '<div class="jpop-left">';
    html += '<h1 class="jpop-cta">' + this.options.title + '</h1>';
    html += '</div>';
    html += '<div class="jpop-right">';
    html += this.htmlForm();
    html += '</div>';
    html += '</div>'

    return html;
  };

  jPop.prototype.htmlPopOver = function() {
    var html = "";

    html += '<div id="jpop-popover" class="jpop-popover" style="position:fixed;width:100%;height:100%;top:0;right:0;bottom:0;left:0">';
    html += '</div>';

    return html;
  };

  jPop.prototype.htmlForm = function() {
    var html = [
      '<form id="jpop" role="form" class="jpop-form">',
        '<label class="sr-only" for="jpop-email">Email</label>',
        '<input id="jpop-email" name="email" placeholder="email" required>',
        '<div id="jpop-error"></div>',
        '<button class="btn btn-default" type="submit">' + this.options.button + '</button>',
      '</form>'
    ].join("\n");

    return html;
  };

  $.fn.jpop = function(options) {
    var jpop = new jPop(this, options);
    jpop.run();
  };

})(jQuery);
