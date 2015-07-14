/*global $, jQuery*/

(function($) {

  "use strict";

  function Jpop(el, options) {
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

    this.el       = el;
    this.loaded   = false;
    this.options  = $.extend(defaultOptions, options);
    this.output   = { error: false, message: this.options.thanks };
    this.endpoint = "https://api.jetstash.com/v1/form/submit";
    this.message  = {
      incorrectType : "Incorrect type set. Check your options.",
      incorrectForm : "You must pass your form id as an option",
      generalError  : "Something went wrong, please refresh and try again."
    };
  }

  Jpop.prototype.run = function() {
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

  Jpop.prototype.loadListeners = function() {
    var self = this;

    $('body').on('submit', 'form#jpop', function(e) {
      var email   = $('#jpop-email').val(),
          $button = $('form#jpop').find('button');

      e.preventDefault();
      self.verifyData(email);

      if(self.output.error === false) {

        $button.attr('disabled', true);

        $.post(self.endpoint, { form : self.options.form, email : email }, function(response) {
          response = JSON.parse(response);
          if(response.success === true) {

            self.loadCustomEvent("jpop-success");
          } else if(response.success === false) {
            self.output = { error: true, message: response.message };
            self.appendError();
            $button.attr('disabled', false);
          } else {
            self.output = { error: true, message: self.message.generalError };
            self.appendError();
            $button.attr('disabled', false);
          }
        });
      } else {
        self.appendError();
      }
    });

    $('body').on('click', '#jpop-dismiss, #jpop-popover', function(e) {
      if(e.target.id !== "jpop-popover") { return; }

      var type = $(this).data('type');

      $('#jpop-backdrop, #jpop-' + type).remove();
      self.loadCustomEvent("jpop-dismissed", { dismissed: true });
    });
  };

  Jpop.prototype.loadCustomEvent = function(name, curState) {
    var evtState = {
      dismissed: false
    };

    curState = curState || {};
    evtState = $.extend(evtState, curState);

    $.event.trigger({ type: name, 'state': evtState });
  };

  Jpop.prototype.verifyData = function(email) {
    var regex  = /\S+@\S+\.\S+/;

    if(email === "") {
      this.output = { error: true, message: this.message.emptyEmail };
    }

    if(false === regex.test(email)) {
      this.output = { error: true, message: this.message.invalidEmail };
    }
  };

  Jpop.prototype.appendError = function() {
    $('#jpop-error').empty().append('<p>' + this.output.message + '</p>');
  };

  Jpop.prototype.inject = function(markup) {
    var self = this, delay, clear;

    if(this.options.show) {
      this.el.append(markup);
      this.loadCustomEvent("jpop-displayed");
    } else if(this.options.scroll) {
      $(window).on("scroll mousewheel", function() {
        if(!self.loaded) {
          self.el.append(markup);
          self.loaded = true;
          self.loadCustomEvent("jpop-displayed");
        }
      });
    } else {
      delay = setInterval(function() {
        self.el.append(markup);
        self.loadCustomEvent("jpop-displayed");
        clear();
      }, this.options.delay);

      clear = function() {
        clearInterval(delay);
      };
    }
  };

  Jpop.prototype.loadBanner = function() {
    var markup = this.htmlBanner();

    this.inject(markup);
  };

  Jpop.prototype.loadPopOver = function() {
    var markup = this.htmlPopOver();

    this.inject(markup);
  };

  Jpop.prototype.htmlBanner = function() {
    var animation = this.options.position === "top" ? "slideInDown" : "slideInUp";

    return [
      '<div id="jpop-banner" data-type="banner" class="jpop-banner animated '+ animation +'" style="position:fixed;z-index:' + this.options.zindex + ';width:100%;left:0;right:0;' + this.options.position + ':0;">',
        '<div class="jpop-left">',
          '<h2 class="jpop-cta">' + this.options.title + '</h2>',
        '</div>',
        '<div class="jpop-right">',
          this.htmlForm(),
        '</div>',
        '<a id="jpop-dismiss" class="jpop-dismiss white" data-type="banner">&times;</a>',
      '</div>'
    ].join("\n");
  };

  Jpop.prototype.htmlPopOver = function() {
    return [
      '<div id="jpop-popover" data-type="popover" class="jpop-popover animated zoomIn" style="position:fixed;z-index:' + this.options.zindex + ';top:0;right:0;bottom:0;left:0">',
        '<div class="jpop-content">',
          '<a id="jpop-dismiss" class="jpop-dismiss orange">&times;</a>',
          '<h1 class="jpop-cta">' + this.options.title + '</h1>',
          this.htmlForm(),
        '</div>',
      '</div>',
      '<div id="jpop-backdrop" class="jpop-backdrop animated fadeIn" data-type="popover"></div>'
    ].join("\n");

  };

  Jpop.prototype.htmlForm = function() {
    return [
      '<form id="jpop" role="form" class="jpop-form">',
        '<label class="sr-only" for="jpop-email">Email</label>',
        '<input type="email" id="jpop-email" class="jpop-input" name="email" placeholder="email" required>',
        '<div id="jpop-error" class="jpop-error"></div>',
        '<button class="jpop-btn btn-default" type="submit">' + this.options.button + '</button>',
      '</form>'
    ].join("\n");
  };

  $.fn.jpop = function(options) {
    var jpop = new Jpop(this, options);
    jpop.run();
  };

}(jQuery));
