/*

Version: 0.0.1
Build: Mon, 13 Jul 2015 22:28:54 GMT

The MIT License (MIT)

Copyright (c) 2015 Jetstash LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
!function(o){function t(t,e){var s={form:null,type:"banner",position:"top",style:!1,zindex:8675309,show:!1,delay:500,scroll:!1,title:"Subscribe to our email list",button:"Submit",thanks:"Thanks"};this.el=t,this.loaded=!1,this.options=o.extend(s,e),this.output={error:!1,message:this.options.thanks},this.endpoint="https://api.jetstash.com/v1/form/submit",this.message={incorrectType:"Incorrect type set. Check your options.",incorrectForm:"You must pass your form id as an option",generalError:"Something went wrong, please refresh and try again."}}t.prototype.run=function(){if(this.loadListeners(),null!==this.options.form)switch(this.options.type){case"banner":this.loadBanner();break;case"popover":this.loadPopOver();break;default:console.log(this.message.incorrectType)}else console.log(this.message.incorrectForm)},t.prototype.loadListeners=function(){var t=this;o("body").on("submit","form#jpop",function(e){var s=o("#jpop-email").val(),i=o("form#jpop").find("button");e.preventDefault(),t.verifyData(s),t.output.error===!1?(i.attr("disabled",!0),o.post(t.endpoint,{form:t.options.form,email:s},function(o){o=JSON.parse(o),o.success===!0?t.loadCustomEvent("jpop-success"):o.success===!1?(t.output={error:!0,message:o.message},t.appendError(),i.attr("disabled",!1)):(t.output={error:!0,message:t.message.generalError},t.appendError(),i.attr("disabled",!1))})):t.appendError()}),o("body").on("click","#jpop-dismiss, #jpop-backdrop",function(){var e=o(this).data("type");o("#jpop-"+e).remove(),o("#jpop-backdrop").remove(),t.loadCustomEvent("jpop-dismissed",{dismissed:!0})})},t.prototype.loadCustomEvent=function(t,e){var s={dismissed:!1};e=e||{},s=o.extend(s,e),o.event.trigger({type:t,state:s})},t.prototype.verifyData=function(o){var t=/\S+@\S+\.\S+/;""===o&&(this.output={error:!0,message:this.message.emptyEmail}),!1===t.test(o)&&(this.output={error:!0,message:this.message.invalidEmail})},t.prototype.appendError=function(){o("#jpop-error").empty().append("<p>"+this.output.message+"</p>")},t.prototype.inject=function(t){var e,s,i=this;this.options.show?(this.el.append(t),this.loadCustomEvent("jpop-displayed")):this.options.scroll?o(window).on("scroll mousewheel",function(){i.loaded||(i.el.append(t),i.loaded=!0,i.loadCustomEvent("jpop-displayed"))}):(e=setInterval(function(){i.el.append(t),i.loadCustomEvent("jpop-displayed"),s()},this.options.delay),s=function(){clearInterval(e)})},t.prototype.loadBanner=function(){var o=this.htmlBanner();this.inject(o)},t.prototype.loadPopOver=function(){var o=this.htmlPopOver();this.inject(o)},t.prototype.htmlBanner=function(){var o="top"===this.options.position?"slideInDown":"slideInUp";return['<div id="jpop-banner" data-type="banner" class="jpop-banner animated '+o+'" style="position:fixed;z-index:'+this.options.zindex+";width:100%;left:0;right:0;"+this.options.position+':0;">','<div class="jpop-left">','<h2 class="jpop-cta">'+this.options.title+"</h2>","</div>",'<div class="jpop-right">',this.htmlForm(),"</div>",'<a id="jpop-dismiss" class="jpop-dismiss white" data-type="banner">Close</a>',"</div>"].join("\n")},t.prototype.htmlPopOver=function(){return['<div id="jpop-popover" data-type="popover" class="jpop-popover animated zoomIn" style="position:fixed;z-index:'+this.options.zindex+';top:0;right:0;bottom:0;left:0">','<div class="jpop-content">','<a id="jpop-dismiss" class="jpop-dismiss orange">Close</a>','<h1 class="jpop-cta">'+this.options.title+"</h1>",this.htmlForm(),"</div>","</div>",'<div id="jpop-backdrop" class="jpop-backdrop animated fadeIn" data-type="popover"></div>'].join("\n")},t.prototype.htmlForm=function(){return['<form id="jpop" role="form" class="jpop-form">','<label class="sr-only" for="jpop-email">Email</label>','<input type="email" id="jpop-email" class="jpop-input" name="email" placeholder="email" required>','<div id="jpop-error" class="jpop-error"></div>','<button class="jpop-btn btn-default" type="submit">'+this.options.button+"</button>","</form>"].join("\n")},o.fn.jpop=function(o){var e=new t(this,o);e.run()}}(jQuery);