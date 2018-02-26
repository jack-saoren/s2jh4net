+function($){var ExtFormValidator=function(element,options){this.$element=$(element);this.options=$.extend({},ExtFormValidator.DEFAULTS,options);this.init()};ExtFormValidator.VERSION="1.0.0";ExtFormValidator.DEFAULTS={postDismissModal:"auto",postReloadGrid:true,elementsExpr:":input:not(button)"};ExtFormValidator.prototype.updateFormData=function(data,forceOverwrite){var $element=this.$element;for(var key in data){var el="input[name='"+key+"'],select[name='"+key+"'],textarea[name='"+key+"']";var $el=$element.find(el);if(forceOverwrite==false){if($.trim($el.val())!=""){continue}}var val=data[key];$el.val(val);if($el.is("select")){$el.trigger("change.select2")}}};ExtFormValidator.prototype.init=function(){var $element=this.$element;var options=this.options;if(options.validation!==false){this.preProcess();this.validateProcess();this.postProcess()}};ExtFormValidator.prototype.dynamicTableValidation=function(){var $element=this.$element;var options=this.options;var that=this;$element.find("table[data-dynamic-edit-table][data-validation]").each(function(){var $container=$(this);var validationRules=$container.data().validation;if(validationRules===true||validationRules===""){}else{if(typeof validationRules=="string"){validationRules=eval("("+validationRules+")")}if(Config.isDebugEnable()){console.log("Table validationRules:");console.log(validationRules)}$container.find("> tbody > tr").each(function(idx,item){var $line=$(this);for(var key in validationRules){var $el=$line.find("[name$='"+key+"']");if($el.size()==0){continue}var rules=validationRules[key];var cloneRules=jQuery.extend(true,{},rules);that.settingElementAttrByRules(cloneRules,$el,$line.find("input[name$='id']"))}$line.find(options.elementsExpr).each(function(){var $el=$(this);var elOptions=$el.data();that.buildElementByAttr($el,elOptions);if(idx==0){var $td=$el.closest("td");var index=$td.parent().children("td").index($td);var $label=$container.find(" > thead > tr > th:eq("+index+")");if($el.attr("required")){var $tips=$label.children("span.required");if($tips.size()==0){$tips=$('<span class="required">*</span>');$tips.appendTo($label)}}if(elOptions.tooltips){var $tips=$label.children("span[data-tooltips]");if($tips.size()==0){$tips=$('<span data-tooltips="'+elOptions.tooltips+'"></span>');$tips.appendTo($label);if(elOptions.tooltipsPosition==undefined){if(elOptions.ruleDate){$tips.attr("data-position","right")}}else{$tips.attr("data-position",elOptions.tooltipsPosition)}}}}})});if(!Config.isDebugEnable()){$container.attr("data-validation","done")}}})};ExtFormValidator.prototype.settingElementAttrByRules=function(rules,$el,$id){delete rules.integer;if($el.attr("data-tooltips")==undefined&&rules.tooltips){$el.attr("data-tooltips",rules.tooltips);$el.data("tooltips",rules.tooltips);delete rules.tooltips}if($el.attr("readonly")==undefined&&rules.readonly){if($el.attr("readonly")==undefined&&$id.size()&&$id.val()!=""){$el.attr("readonly","true")}delete rules.readonly}if($el.attr("maxlength")==undefined&&rules.maxlength){$el.attr("maxlength",rules.maxlength)}if($el.attr("required")==undefined&&rules.required){$el.attr("required",true)}for(var rule in rules){if($el.attr("data-rule-"+rule)){delete rules[rule]}if(!$.validator.methods[rule]){Global.notify("error","未定义的表单校验规则："+rule);delete rules[rule]}$el.attr("data-rule-"+rule,rules[rule])}};ExtFormValidator.prototype.buildElementByAttr=function($el,elOptions){if($el.is(":text,textarea")&&!$el.hasClass("form-control")){$el.addClass("form-control")}if($el.attr("maxlength")){$el.maxlength({limitReachedClass:"label label-danger",alwaysShow:true});$el.on("maxlength.shown",function(){$("span.bootstrap-maxlength").css({zIndex:10065})})}if($el.is(":text")){$el.blur(function(){$el.val($.trim($el.val()))});if("undefined"!=typeof Pinyin&&elOptions.spellTo){$el.change(function(){var val=$el.val();if(val!=""){var $spellTo=$element.find('input[name="'+elOptions.spellTo+'"]');$spellTo.val(Pinyin.getCamelChars(val))}})}}};ExtFormValidator.prototype.preProcess=function(){var $element=this.$element;var options=this.options;var that=this;if(options.validation===true||options.validation===""){}else{if(typeof options.validation=="string"){options.validation=eval("("+options.validation+")")}if(Config.isDebugEnable()){console.log("Form validationRules:");console.log(options.validation)}$element.attr("data-entity-class",options.validation._class);delete options.validation._class;for(var key in options.validation){var $el=$element.find("[name='"+key+"']");if($el.size()==0){continue}var rules=options.validation[key];that.settingElementAttrByRules(rules,$el,$element.find("input[name='id']"))}if(!Config.isDebugEnable()){$element.attr("data-validation","done")}}this.$element.find(options.elementsExpr).each(function(){var $el=$(this);var elOptions=$el.data();that.buildElementByAttr($el,elOptions);var $label=$el.closest(".form-group").find(".control-label:first");if($el.attr("required")){var $tips=$label.children("span.required");if($tips.size()==0){$tips=$('<span class="required">*</span>');$tips.appendTo($label)}}if(elOptions.tooltips){var $tips=$label.children("span[data-tooltips]");if($tips.size()==0){$tips=$('<span data-tooltips="'+elOptions.tooltips+'"></span>');$tips.appendTo($label);if(elOptions.tooltipsPosition==undefined){if(elOptions.ruleDate){$tips.attr("data-position","right")}}else{$tips.attr("data-position",elOptions.tooltipsPosition)}}}});this.dynamicTableValidation();$element.find("span[data-tooltips]").each(function(){var $tips=$(this);var tipsOptions=$tips.data();$tips.addClass("glyphicon glyphicon-exclamation-sign tooltipster");$tips.attr("title",tipsOptions.tooltips);$tips.tooltipster($.extend({contentAsHTML:true,offsetY:15,theme:"tooltipster-punk",position:"top"},tipsOptions))})};ExtFormValidator.prototype.validateProcess=function(){var $element=this.$element;var options=this.options;var that=this;var url=$element.attr("action");if(url){$element.attr("action",Util.smartParseURL(url))}this.validator=$element.validate({errorElement:"span",errorClass:"error-block",focusInvalid:false,ignore:":disabled",errorPlacement:function(error,element){var $errorPlacement=element.closest(".controls");if($errorPlacement.size()>0){error.appendTo($errorPlacement)}else{if(element.parent("td").size()>0){error.appendTo(element.parent("td"))}else{error.insertAfter(element)}}},invalidHandler:function(event,validator){App.scrollTo($(validator.errorList[0].element).closest(".form-group"),-100)},highlight:function(element){$(element).closest(".form-group").addClass("has-error");$(element).closest("td").addClass("has-error")},unhighlight:function(element){var $errorPlacement=$(element).closest(".form-group").find(".error-placement");if($errorPlacement.size()>0){if($errorPlacement.find(".error-block").size()>0){return}}$(element).closest("td").removeClass("has-error");$(element).closest(".form-group").removeClass("has-error");$(element).closest("form").find(".form-error-placement").empty()},success:function(label){label.remove()},submitHandler:function(form){var submitButton=$(this.submitButton);if(submitButton.attr("data-form-action")){$element.attr("action",submitButton.attr("data-form-action"))}if(submitButton.attr("data-confirm")){if(!confirm(submitButton.attr("data-confirm"))){return false}}if(options.submitHandler){options.submitHandler.call(this,form);return false}var target=$element.attr("target");if(target){form.submit();return true}var $searchGroup=$element.closest(".search-group");if($searchGroup.size()>0){var $searchTarget=$searchGroup.find(".search-group-target");if($searchTarget.size()>0){if($searchTarget.is("table")){$searchTarget.extDataGrid({gridOptions:{autoInitLoad:false}});$searchTarget.extDataGrid("search",$element.serializeArray());that.$searchGrid=$searchTarget}else{that.$searchAjax=$searchTarget;if($searchTarget.is("tbody")){$searchTarget.parent("table.table-infinite-scroll").removeAttr("data-scroll-loading").removeAttr("data-scroll-page")}var url=$element.attr("action");if(url.indexOf("?")>-1){url=url+"&"+$element.serialize()}else{url=url+"?"+$element.serialize()}$searchTarget.ajaxGetUrl(url,false)}return false}}App.blockUI({target:$element,animate:true,overlayColor:"none"});submitButton.attr("disabled",true);var postData={};if(submitButton.attr("_serverValidationConfirmed_")){postData._serverValidationConfirmed_=true;submitButton.removeAttr("_serverValidationConfirmed_")}var $actions=submitButton.closest(".form-actions");if($actions.size()==0){$actions=submitButton}$element.find(".alert-validation").remove();var isIE=!!window.ActiveXObject;if(isIE){$element.find("input[type='file']").attr("disabled",true)}$element.ajaxSubmit({dataType:"json",method:"post",data:postData,success:function(response){if(isIE){$element.find("input[type='file']").attr("disabled",false)}submitButton.attr("disabled",false);App.unblockUI($element);if(response.type=="confirm"){swal({title:response.message+" 请确认是否继续提交表单？",text:response.data?response.data.join("<br/>"):response.message,allowOutsideClick:false,showConfirmButton:true,showCancelButton:true,closeOnConfirm:true,closeOnCancel:true,confirmButtonText:"确认",cancelButtonText:"取消"},function(isConfirm){if(isConfirm){submitButton.attr("_serverValidationConfirmed_",true);submitButton.click()}else{submitButton.removeAttr("_serverValidationConfirmed_")}});return}if(response.type=="success"||response.type=="warning"){var result=$element.triggerHandler("form-submit-success",[response]);if(result!=undefined&&result==false){return}if(response.message){if(!Global.notify(response.type,response.message)){var $alert=$element.find("div.alert-edit-success");if($alert.size()==0){$alert=$("<div class='alert alert-success alert-edit-success'><p>"+response.message+"</p></div>");var $elementActions=submitButton.closest(".form-actions");if($elementActions.size()>0){$alert.insertBefore($elementActions)}else{$alert.prependTo($element)}}else{$alert.html(response.message)}if(response.redirect){var count=10;var $count=$("<p>"+count+"秒后自动跳转，<a class='auto' href='javascript:;'>取消自动跳转</a>|<a class='now' href='javascript:;'>立即跳转</a></p>").appendTo($alert);window.timer=setInterval(function(){count--;if(count>0){$count.html(count+"秒后自动跳转，<a class='auto' href='javascript:;'>取消自动跳转</a>|<a class='now' href='javascript:;'>立即跳转</a>")}else{clearInterval(window.timer);window.location.href=Util.smartParseURL(response.redirect)}},1000);$count.on("click","a.auto",function(){clearInterval(window.timer);$count.html("<a class='now' href='javascript:;'>点击跳转</a>")});$count.on("click","a.now",function(){clearInterval(window.timer);window.location.href=Util.smartParseURL(response.redirect)})}}}$element.attr("form-data-modified","false");var $modal=$element.closest(".modal");if(options.postReloadGrid){if(options.postReloadGrid===true&&$modal.size()){options.postReloadGrid=$modal.attr("data-grid-id")}$("#"+options.postReloadGrid).extDataGrid("refresh")}else{if($modal.size()){var gridId=$modal.attr("data-grid-id");$("#"+gridId).extDataGrid("refresh",true)}}if($modal.size()){var $dismiss=$modal.find(".modal-header button[data-dismiss='modal']");var postDismissModal=options.postDismissModal;if(postDismissModal===true){if($modal.size()>0){$dismiss.click()}}else{if(postDismissModal==="auto"){var $tabs=$modal.find(".modal-body > .ajax-page-inner > .tabbable > .nav > li:not(.tools)");if($tabs.size()<=1){$dismiss.click()}else{var id=$element.find("input[name='id']").val();if(id&&id!=""){$dismiss.click()}else{var activeIdx=0;$tabs.each(function(i){if($(this).is(".active")){activeIdx=i;return false}});var $modalBody=$modal.find(".modal-body");var url=$modalBody.attr("data-url");url=Util.addOrReplaceUrlParameter(url,"id",response.data.id);url=Util.addOrReplaceUrlParameter(url,"_tab_active",activeIdx);$modalBody.ajaxGetUrl(url)}}}}}else{}}else{if(response.type=="failure"||response.type=="error"){$element.find(".alert-success").hide();var ret=$element.triggerHandler("form-submit-failure",[response]);if(ret==undefined||ret==true){var $elementErrorPlacement=$element.find(".form-error-placement");if($elementErrorPlacement.size()>0){$elementErrorPlacement.closest(".form-group").addClass("has-error");$elementErrorPlacement.html('<span class="error-block">'+response.message+"</span>")}else{$actions.before("<div class='alert alert-danger alert-validation'>"+response.message+"</div>")}$("img.captcha-img",$element).click()}}else{$element.find(".alert-success").hide();$actions.before("<div class='alert alert-danger alert-validation'>E03: 表单处理异常，请联系管理员</div>");$("img.captcha-img",$element).click()}}},error:function(xhr){submitButton.attr("disabled",false);App.unblockUI($element);$element.find(".alert-success").hide();$element.find("input[name='token']").val(new Date().getTime());$("img.captcha-img",$element).click();var message=Util.handleAjaxError(xhr);Global.notify("error",message);$actions.before("<div class='alert alert-danger alert-validation'>"+message+"</div>")}});return false}})};ExtFormValidator.prototype.postProcess=function(){var $element=this.$element;var options=this.options;var that=this;$('.form-body .row[data-equal-height="true"]',$element).each(function(){var maxHeight=0;var $rowcols=$(this).find(" > div > .form-group > div, > .form-group > div");$rowcols.each(function(){var height=10;if($(this).is(".ui-sortable")){height=$(this).find("div:first").innerHeight()+12}else{height=$(this).innerHeight()}if(height>maxHeight){maxHeight=height}var labelHeight=$(this).prev(".control-label").innerHeight();if(labelHeight>maxHeight){maxHeight=labelHeight+2}});$rowcols.css("min-height",maxHeight)});if($element.hasClass("form-search-init")){$element.submit()}if($element.hasClass("form-search-auto")){$("select",$element).on("change",function(){setTimeout(function(){$form.submit()},100)});$("label.btn",$element).on("click",function(){setTimeout(function(){$form.submit()},100)})}$element.find('[type="reset"]').click(function(){if(that.$searchGrid){that.$searchGrid[0].clearToolbar(false)}setTimeout(function(){$element.find('[data-toggle="buttons"] label.btn > input.toggle').each(function(){if($(this).is(":checked")){$(this).parent().addClass("active")}else{$(this).parent().removeClass("active")}});$element.find("input[data-date-init]").each(function(){var $datapicker=$(this);var dataPicker=$datapicker.attr("data-picker");var initVal=$datapicker.attr("data-date-init");if(initVal&&"today"==initVal){var today=moment().format("YYYY-MM-DD");if(dataPicker=="date-range"){$datapicker.val(today+" ~ "+today)}else{$datapicker.val(today)}}});$element.find("select").each(function(){$(this).val(null).trigger("change")});$element.find(":radio.form-control-icheck,:checkbox.form-control-icheck").iCheck("update");if(that.$searchGrid||that.$searchAjax){$element.submit()}},100);return})};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("extFormValidator");var options=typeof option=="object"&&option;if(!data){$this.data("extFormValidator",(data=new ExtFormValidator(this,options)))}if(typeof option=="string"){data[option]()}})}var old=$.fn.extFormValidator;$.fn.extFormValidator=Plugin;$.fn.extFormValidator.Constructor=ExtFormValidator;$.fn.extFormValidator.noConflict=function(){$.fn.extFormValidator=old;return this};Global.addComponent({name:"ExtFormValidator",plugin:Plugin,expr:"form[data-validation]",runPoint:Global.Component_Run_Point.AfterAjaxPageShow,order:2000})}(jQuery);