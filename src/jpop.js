;(function($) {

  function jPop(el, options) {
    var defaultOptions = {
      type     : "banner",
      position : "top",
      style    : false,
      show     : false,
      delay    : 500,
      scroll   : false
    };

    this.options = $.extend(defaultOptions, options);
    this.message = {
      incorrectType: "Incorrect type set. Check your options."
    };
  }

  jPop.prototype.run = function() {
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
  };

  jPop.prototype.loadBanner = function() {
    console.log("Loading Banner...");
  };

  jPop.prototype.loadPopOver = function() {
    console.log("Loading Popover...");
  };

  $.fn.jpop = function(options) {
    var jpop = new jPop(this, options);
    jpop.run();
  };

})(jQuery);
