+function(d){var b=function(f,e){this.$element=d(f);this.options=d.extend({},b.DEFAULTS,e);this.init()};b.NAME="ExtPluginTemplate";b.VERSION="1.0.0";b.DEFAULTS={};b.prototype.init=function(){var e=this.$element;var f=this.options};function c(f){var e=arguments;return this.each(function(){var j=d(this);var i=j.data("ExtPluginTemplate");var h=h||j.data();var g=typeof h=="object"&&h;if(!i){j.data("ExtPluginTemplate",(i=new b(this,g)))}if(typeof h=="string"){i[h].apply(i,d.makeArray(e).slice(1))}})}var a=d.fn.extPluginTemplate;d.fn.extPluginTemplate=c;d.fn.extPluginTemplate.Constructor=b;d.fn.extPluginTemplate.noConflict=function(){d.fn.extPluginTemplate=a;return this};Global.addComponent({name:"ExtPluginTemplate",plugin:c,runPoint:Global.Component_Run_Point.AfterAjaxPageShow,expr:'input[data-toggle="template"]'})}(jQuery);