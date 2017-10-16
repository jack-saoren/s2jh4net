$.fn.fmatter.showlink=function(c,a,l){var e={baseLinkUrl:a.baseLinkUrl,showAction:a.showAction,addParam:a.addParam||"",target:a.target,idName:a.idName},f="",g="",h;if(a.colModel!==undefined&&a.colModel.formatoptions!==undefined){e=$.extend({},e,a.colModel.formatoptions)}if(e.target){f=' target="'+e.target+'"'}if(e.title){g=' title="'+e.title+'"'}var b=null;if(e.idValue=="id"){b=a.rowId}else{b=l[e.idValue];if((b==undefined||b=="")&&e.idValue.indexOf(".")>-1){var d=l;$.each(e.idValue.split("."),function(m,n){d=d[n]});b=d}}h=e.baseLinkUrl+e.showAction+"?"+e.idName+"="+b+e.addParam;if($.fmatter.isString(c)||$.fmatter.isNumber(c)){return"<a "+f+g+' href="'+h+'">'+c+"</a>"}return $.fn.fmatter.defaultFormat(c,a)};var Grid=function(){var a=false;return{initGridDefault:function(){$.extend($.ui.multiselect,{locale:{addAll:"全部添加",removeAll:"全部移除",itemsCount:"已选择项目列表"}});$.extend($.jgrid.ajaxOptions,{dataType:"json"});$.extend($.jgrid.defaults,{guiStyle:"bootstrap",iconSet:"fontAwesome",datatype:"json",loadui:false,loadonce:false,filterToolbar:{},ignoreCase:true,prmNames:{npage:"npage"},jsonReader:{repeatitems:false,root:"content",total:"totalPages",records:"totalElements"},treeReader:{level_field:"extraAttributes.level",parent_id_field:"extraAttributes.parent",leaf_field:"extraAttributes.isLeaf",expanded_field:"extraAttributes.expanded",loaded:"extraAttributes.loaded",icon_field:"extraAttributes.icon"},autowidth:true,rowNum:15,page:1,altclass:"ui-jqgrid-evennumber",height:"stretch",viewsortcols:[true,"vertical",true],mtype:"GET",viewrecords:true,rownumbers:true,toppager:true,pagerpos:"center",recordpos:"right",gridview:true,altRows:true,sortable:false,multiboxonly:true,multiselect:true,multiSort:false,forceFit:false,shrinkToFit:true,sortorder:"desc",sortname:"id",ajaxSelectOptions:{cache:true},loadError:function(g,l,c,f){try{var d="表格数据加载处理失败,请尝试刷新或联系管理员";var b=jQuery.parseJSON(g.responseText);if(b.type=="failure"||b.type=="error"){d=b.message}Global.notify("error",d)}catch(h){Global.notify("error","数据处理异常")}App.unblockUI()},subGridOptions:{reloadOnExpand:false}});$.extend($.jgrid.search,{multipleSearch:true,multipleGroup:true,width:700,jqModal:false,searchOperators:true,stringResult:true,searchOnEnter:true,defaultSearch:"bw",operandTitle:"点击选择查询方式",odata:[{oper:"eq",text:"等于\u3000\u3000"},{oper:"ne",text:"不等\u3000\u3000"},{oper:"lt",text:"小于\u3000\u3000"},{oper:"le",text:"小于等于"},{oper:"gt",text:"大于\u3000\u3000"},{oper:"ge",text:"大于等于"},{oper:"bw",text:"开始于"},{oper:"bn",text:"不开始于"},{oper:"in",text:"属于\u3000\u3000"},{oper:"ni",text:"不属于"},{oper:"ew",text:"结束于"},{oper:"en",text:"不结束于"},{oper:"cn",text:"包含\u3000\u3000"},{oper:"nc",text:"不包含"},{oper:"nu",text:"不存在"},{oper:"nn",text:"存在"},{oper:"bt",text:"介于"}],operands:{eq:"=",ne:"!",lt:"<",le:"<=",gt:">",ge:">=",bw:"^",bn:"!^","in":"=",ni:"!=",ew:"|",en:"!@",cn:"~",nc:"!~",nu:"#",nn:"!#",bt:"~~"}});$.extend($.jgrid.del,{serializeDelData:function(b){b.ids=b.id;b.id="";return b},errorTextFormat:function(c){var b=jQuery.parseJSON(c.responseText);return b.message},afterComplete:function(d){var c=new Array();var b=jQuery.parseJSON(d.responseText);if(b.type=="success"){top.$.publishMessage(b.message);c[0]=true}else{top.$.publishError(b.message);c[0]=false}return c},ajaxDelOptions:{dataType:"json"}});$.jgrid.extend({bindKeys:function(b){var c=$.extend({upKey:true,downKey:true,onEnter:null,onSpace:null,onLeftKey:null,onRightKey:null,scrollingRows:true},b||{});return this.each(function(){var d=this;if(!$("body").is("[role]")){$("body").attr("role","application")}d.p.scrollrows=c.scrollingRows;$(d).keydown(function(h){var l=$(d).find("tr[tabindex=0]")[0],n,g,m,f=d.p.treeReader.expanded_field;if(l){m=d.p._index[$.jgrid.stripPref(d.p.idPrefix,l.id)];if(h.keyCode===37||h.keyCode===38||h.keyCode===39||h.keyCode===40){if(h.keyCode===38&&c.upKey){g=l.previousSibling;n="";if(g){if($(g).is(":hidden")){while(g){g=g.previousSibling;if(!$(g).is(":hidden")&&$(g).hasClass("jqgrow")){n=g.id;break}}}else{n=g.id}}$(d).jqGrid("setSelection",n,true,h);h.preventDefault()}if(h.keyCode===40&&c.downKey){g=l.nextSibling;n="";if(g){if($(g).is(":hidden")){while(g){g=g.nextSibling;if(!$(g).is(":hidden")&&$(g).hasClass("jqgrow")){n=g.id;break}}}else{n=g.id}}$(d).jqGrid("setSelection",n,true,h);h.preventDefault()}if(h.keyCode===37){if(d.p.treeGrid&&d.p.data[m][f]){$(l).find("div.treeclick").trigger("click")}$(d).triggerHandler("jqGridKeyLeft",[d.p.selrow]);if($.isFunction(c.onLeftKey)){c.onLeftKey.call(d,d.p.selrow)}}if(h.keyCode===39){if(d.p.treeGrid&&!d.p.data[m][f]){$(l).find("div.treeclick").trigger("click")}$(d).triggerHandler("jqGridKeyRight",[d.p.selrow]);if($.isFunction(c.onRightKey)){c.onRightKey.call(d,d.p.selrow)}}}else{if(h.keyCode===13){var e=h.target;if(e.tagName==="TEXTAREA"){return true}h.stopPropagation();$(d).triggerHandler("jqGridKeyEnter",[d.p.selrow]);if($.isFunction(c.onEnter)){c.onEnter.call(d,d.p.selrow)}}else{if(h.keyCode===32){h.stopPropagation();$(d).triggerHandler("jqGridKeySpace",[d.p.selrow]);if($.isFunction(c.onSpace)){c.onSpace.call(d,d.p.selrow)}}else{if(h.keyCode===27){h.stopPropagation();$(d).jqGrid("restoreRow",d.p.selrow,c.afterrestorefunc);$(d).jqGrid("showAddEditButtons")}}}}}})})},refresh:function(){this.each(function(){var b=this;if(!b.grid){return}$(b).jqGrid("setGridParam",{datatype:"json"}).trigger("reloadGrid")})},search:function(b){this.each(function(){var e=this;if(!e.grid){return}var c=$(e).jqGrid("getGridParam","url");for(var d in b){c=AddOrReplaceUrlParameter(c,d,b[d])}$(e).jqGrid("setGridParam",{url:c,page:1}).trigger("reloadGrid")})},exportExcelLocal:function(b){this.each(function(){var f=this;if(!f.grid){return}if(!confirm("确认导出当前页面 "+f.p.caption+" 数据为Excel下载文件？")){return}var e=new Array();e=$(f).getDataIDs();var m=f.p.colModel;var p=f.p.colNames;var h="";for(k=0;k<p.length;k++){var n=m[k];if(n.hidedlg||n.hidden||n.disableExport){continue}h=h+p[k]+"\t"}h=h+"\n";for(i=0;i<e.length;i++){data=$(f).getRowData(e[i]);for(j=0;j<p.length;j++){var n=m[j];if(n.hidedlg||n.hidden||n.disableExport){continue}var g=data[n.name];var l=null;if(n.searchoptions&&n.searchoptions.value){l=n.searchoptions.value}else{if(n.editoptions&&n.editoptions.value){l=n.editoptions.value}}if(l){g=l[g]}if(g.indexOf("<")>-1&&g.indexOf(">")>-1){g=$(g).text()}if(g==""){g=data[n.name]}if(g=="null"||g==null){g=""}g=g.replace(/\&nbsp;/g,"");h=h+g+"\t"}h=h+"\n"}h=h+"\n";var c=$('<form method="post" target = "_blank" action="'+WEB_ROOT+'/admin/util/grid/export"></form>').appendTo($("body"));var o=$('<input type="hidden" name="exportDatas"/>').appendTo(c);var d=$('<input type="hidden" name="fileName"/>').appendTo(c);d.val("export-data.xls");o.val(h);c.submit();c.remove()})},refreshRowIndex:function(){var b=$(this);$.each($(b).jqGrid("getDataIDs"),function(c,d){$(b).find("#"+d).find("input,select").each(function(){var e=$(this).attr("name");$(this).attr("name",e.substring(0,e.indexOf("[")+1)+c+e.substring(e.indexOf("]"),e.length))})})},getAtLeastOneSelectedItem:function(g){var f=$(this);var d=[];var e=jQuery(f).jqGrid("getGridParam","selarrrow");if(e.length>0){for(var b=0;b<e.length;b++){var c=$("#jqg_"+jQuery(f).attr("id")+"_"+e[b]).is(":disabled");if(!c){d.push(e[b])}}}else{var h=jQuery(f).jqGrid("getGridParam","selrow");if(h){d.push(h)}}if(g){jQuery(f).find("table.jqsubgrid").each(function(){var n=$(this).jqGrid("getGridParam","selarrrow");for(var l=0;l<n.length;l++){var m=$("#jqg_"+jQuery(this).attr("id")+"_"+e[l]).is(":disabled");if(!m){d.push(n[l])}}})}if(d.length==0){Global.notify("error","请至少选择一条行项目！");return false}else{return d}},getOnlyOneSelectedItem:function(e){var g=$(this);var d=[];var f=jQuery(g).jqGrid("getGridParam","selarrrow");if(f.length>0){for(var b=0;b<f.length;b++){var c=$("#jqg_"+jQuery(g).attr("id")+"_"+f[b]).is(":disabled");if(!c){d.push(f[b])}}}else{var h=jQuery(g).jqGrid("getGridParam","selrow");if(h){d.push(h)}}if(d.length==0){if(e){Global.notify("error","请选取操作项目")}return false}else{if(d.length>1){Global.notify("error","只能选择一条操作项目");return false}return d[0]}},getSelectedRowdatas:function(){var b=$(this);var c=[];var e=b.jqGrid("getGridParam","selarrrow");if(e){$.each(e,function(g,h){var l=b.jqGrid("getRowData",h);l.id=h;c.push(l)})}else{var d=b.jqGrid("getGridParam","selrow");if(d){var f=b.jqGrid("getRowData",d);f.id=d;c.push(f)}}return c},getSelectedRowdata:function(){var b=$(this);var c=b.jqGrid("getGridParam","selrow");if(c){return b.jqGrid("getRowData",c)}},getDirtyRowdatas:function(){var l=$(this);var g=[];var f=l.jqGrid("getGridParam","colModel");var d=[];$.each(f,function(o,n){if(n.editable){d.push(n.name)}});var b=l.jqGrid("getDataIDs");var h=0;$.each(b,function(n,o){if(!Util.startWith(o,"-")&&o!=""){h++}});var e=BooleanUtil.toBoolean(l.attr("data-clone"));$.each(b,function(n,q){var p=l.jqGrid("getRowData",q);if(BooleanUtil.toBoolean(p["extraAttributes.dirtyRow"])){if(Util.startWith(q,"-")){q=""}var o={id:q};$.each(d,function(s,r){o[r]=p[r]});o._arrayIndex=p._arrayIndex;if(p["extraAttributes.operation"]){o["extraAttributes.operation"]=p["extraAttributes.operation"]}g.push(o)}});var m=l.jqGrid("getGridParam","batchEntitiesPrefix");if(m){var c={};$.each(g,function(n,p){var o=p._arrayIndex;delete p._arrayIndex;if(o==undefined||o==""){o=h;h++}$.each(p,function(r,q){c[m+"["+o+"]."+r]=q})});return c}return g},insertNewRowdata:function(f){var b=$(this);var e=null;var d=b.jqGrid("getDataIDs");$.each(d,function(g,l){var h=b.jqGrid("getRowData",l);if(!BooleanUtil.toBoolean(h["extraAttributes.dirtyRow"])){e=l;return false}});var c=-Math.floor(new Date().getTime()+Math.random()*100+100);f["extraAttributes.dirtyRow"]=true;if(e){b.jqGrid("addRowData",c,f,"before",e)}else{b.jqGrid("addRowData",c,f,"last")}return c},setEditingRowdata:function(l,c){var b=$(this);var d=b.find("tbody");for(var f in l){var g="input[name='"+f+"'],select[name='"+f+"'],textarea[name='"+f+"']";var e=d.find(g);if(c==false){if($.trim(e.val())!=""){continue}}var h=l[f];e.val(h).attr("title",h);if(e.is("select")){e.select2({openOnEnter:false,placeholder:"请选择...",matcher:function(n,q){var m=Pinyin.getCamelChars(q)+"";var p=m.toUpperCase().indexOf(n.toUpperCase())==0;var o=q.toUpperCase().indexOf(n.toUpperCase())==0;return(p||o)}})}}},getEditingRowdata:function(){var b=$(this);var d=b.find("tbody");var e={};var c="input,select,textarea";d.find(c).each(function(){var f=$(this);e[f.attr("name")]=f.val()});return e},isEditingMode:function(d){var b=$(this);var c=b.find('tr[editable="1"]');if(c.size()>0){if(d==undefined){return true}if(d===true){alert("请先保存或取消正在编辑的表格数据行项后再操作")}else{alert(d)}return true}return false},sumColumn:function(d,f){var b=$(this);if(f==undefined){f=2}var e=b.jqGrid("getCol",d,false,"sum");var c=Math.pow(10,f);return Math.round(e*c)/c},getDataFromBindSeachForm:function(d){var b=$(this);var c=b.jqGrid("getGridParam","bindSearchFormData");var e=c[d];return e}});a=true},initAjax:function(b){if(b==undefined){b=$("body")}$('table[data-grid="table"],table[data-grid="items"]',b).each(function(){Grid.initGrid($(this))})},initGrid:function(K,v){if(!a){Grid.initGridDefault()}var Z=$(K);if(Z.hasClass("ui-jqgrid-btable")){return}if(Z.attr("id")==undefined){Z.attr("id","grid_"+new Date().getTime())}if(v==undefined&&Z.data("gridOptions")==undefined){alert("Grid options undefined: class="+Z.attr("class"));return}var p=$.extend(true,{},Z.data("gridOptions"),v);var d=Z.attr("data-grid");var y=null;var R=Z.attr("id")+"-context-menu-container";var L=null;var e=(d=="items"?false:true);var z=(d=="items"?false:true);var C=$.extend(true,{},$.jgrid.defaults,{formatter:{integer:{defaultValue:""},number:{decimalSeparator:".",thousandsSeparator:",",decimalPlaces:2,defaultValue:""},currency:{decimalSeparator:".",thousandsSeparator:",",decimalPlaces:2,defaultValue:""}},cmTemplate:{sortable:d=="items"?false:true},viewsortcols:d=="items"?[true,"vertical",false]:[true,"vertical",true],altRows:d=="items"?false:true,hoverrows:d=="items"?false:true,pgbuttons:d=="items"?false:true,pginput:d=="items"?false:true,rowList:d=="items"?[]:[10,15,20,50,100,200,500,1000,2000],inlineNav:{add:p.editurl||d=="items"?true:false,edit:p.editurl||d=="items"?true:false,del:p.delurl||d=="items"?true:false,restoreAfterSelect:d=="items"?false:true,addParams:{addRowParams:{extraparam:{},restoreAfterError:false,beforeSaveRow:function(c){if(C.beforeInlineSaveRow){C.beforeInlineSaveRow.call(Z,c)}},aftersavefunc:function(aj,ak){if(C.editurl=="clientArray"){Z.jqGrid("resetSelection");if(C.afterInlineSaveRow){C.afterInlineSaveRow.call(Z,aj)}setTimeout(function(){$("#"+y).find(".ui-pg-div span.fa-plus").click()},200);return}var ai=jQuery.parseJSON(ak.responseText);if(ai.type=="success"||ai.type=="warning"){Global.notify(ai.type,ai.message);var c=ai.data.id;Z.find("#"+aj).attr("id",c);Z.jqGrid("resetSelection");Z.jqGrid("setSelection",c);if(C.afterInlineSaveRow){C.afterInlineSaveRow.call(Z,aj)}setTimeout(function(){$("#"+y).find(".ui-pg-div span.fa-plus").click()},200)}else{if(ai.type=="failure"||ai.type=="error"){Global.notify("error",ai.message)}else{Global.notify("error","数据处理异常，请联系管理员")}}},errorfunc:function(ai,aj){var c=jQuery.parseJSON(aj.responseText);Global.notify("error",c.message)}}},editParams:{restoreAfterError:false,beforeSaveRow:function(c){if(C.beforeInlineSaveRow){C.beforeInlineSaveRow.call(Z,c)}},oneditfunc:function(al){var ai=Z.jqGrid("getGridParam","iCol");var c=Z.jqGrid("getGridParam","colModel")[ai];var ak=Z.find("tr#"+al);var am=ak.find("> td:eq("+ai+")");var aj=am.find("input:visible:first");if(aj.size()>0&&aj.attr("readonly")==undefined){setTimeout(function(){aj.focus()},200)}else{ak.find("input:visible:enabled:first").focus()}},aftersavefunc:function(ai,al){var ak=true;if(C.editurl!="clientArray"){var c=jQuery.parseJSON(al.responseText);if(c.type=="success"||c.type=="warning"){Global.notify(c.type,c.message)}else{if(c.type=="failure"||c.type=="error"){Global.notify("error",c.message);ak=false}else{Global.notify("error","数据处理异常，请联系管理员");ak=false}}}if(ak){if(C.afterInlineSaveRow){C.afterInlineSaveRow.call(Z,ai)}if(C.editurl!="clientArray"){var aj=Z.find("tr.jqgrow[id='"+ai+"']").next("tr");if(aj.size()>0){var am=aj.attr("id");Z.jqGrid("resetSelection");Z.jqGrid("setSelection",am);setTimeout(function(){$("#"+y).find(".ui-pg-div span.fa-pencil").click()},200)}}}},errorfunc:function(ai,aj){if(aj.status==404){Global.notify("error",aj.status+": 请求地址未找到")}else{var c=jQuery.parseJSON(aj.responseText);Global.notify("error",c.message)}}}},inlineEditing:{serializeSaveData:function(c){if(c.oper==="add"){c.id=""}c["extraAttributes.dirtyRow"]=true;return c}},filterToolbar:z,multiselect:e,contextMenu:true,columnChooser:true,exportExcelLocal:true,loadBeforeSend:function(){App.blockUI(Z.closest(".ui-jqgrid"))},subGridBeforeExpand:function(){var c=Z.closest(".ui-jqgrid-bdiv");c.css({height:"auto"})},beforeProcessing:function(ai){if(ai&&ai.content){var c=1000;$.each(ai.content,function(aj,ak){if(ak.extraAttributes&&ak.extraAttributes.dirtyRow){ak.id=-(c++)}});if(ai.totalElements>=(2147473647-10000)){Z.jqGrid("setGridParam",{recordtext:"{0} - {1}\u3000"})}}},loadComplete:function(aj){App.unblockUI(Z.closest(".ui-jqgrid"));Z.jqGrid("showAddEditButtons");if(aj==undefined){return}if(aj.total==undefined&&aj.totalElements==undefined){alert("表格数据格式不正确");return}if(aj&&aj.content){$.each(aj.content,function(ak,al){Z.setRowData(al.id,{_arrayIndex:ak})});if(aj.totalElements>=(2147473647-10000)){Z.closest(".ui-jqgrid").find(".ui-pg-table td[id^='last_']").addClass("ui-state-disabled");Z.closest(".ui-jqgrid").find(".ui-pg-table .ui-pg-input").each(function(){$(this).parent().html($(this))})}}if(d=="items"&&C.inlineNav.add!=false){for(var ai=1;ai<=3;ai++){Z.addRowData(-ai,{})}}if(P=="enable"&&C.contextMenu&&L.find("li").length>0){Z.find("tr.jqgrow").each(function(){$(this).contextmenu({target:"#"+R,onItem:function(am,al){var ak=$(al).attr("role-idx");L.find('a[role-idx="'+ak+'"]').click();return true}})})}if(C.footerrow){if(C.footerLocalDataColumn){$.each(C.footerLocalDataColumn,function(al,an){var am=Z.jqGrid("sumColumn",an);var ak=[];ak[an]=am;Z.footerData("set",ak)})}else{$.each(C.colModel,function(am,al){if(al.footersum!=undefined&&al.footersum==false){return}if(al.formatter=="integer"||al.formatter=="currency"||al.formatter=="number"){var an=Z.jqGrid("sumColumn",al.name);var ak=[];ak[al.name]=an;Z.footerData("set",ak)}})}}if(Z.attr("data-selected")){Z.jqGrid("setSelection",Z.attr("data-selected"),false)}var c=p.userLoadComplete;if(c){c.call(Z,aj)}$('[data-hover="dropdown"]',Z.closest(".ui-jqgrid")).dropdownHover()},beforeSelectRow:function(aj){if(C.inlineNav.restoreAfterSelect==false){var ai=Z.jqGrid("getGridParam","selrow");var c=Z.find("tr#"+ai).attr("editable");if(ai&&ai!=aj&&c=="1"){$("#"+y).find(".ui-pg-div span.fa-floppy-o").click();return false}}return true},onSelectRow:function(aj,c,ai){Z.find("tr.jqgrow").attr("tabindex",-1);Z.find("tr.jqgrow[id='"+aj+"']").attr("tabindex",0);if(d=="items"){$("#"+y).find(".ui-pg-div span.fa-pencil").click()}},onCellSelect:function(ai,c){Z.jqGrid("setGridParam",{iCol:c})},ondblClickRow:function(ak,am,ai,al){var c=$("#"+y).find("i.fa-edit").parent("a");if(c.size()>0){c.click()}else{if(d!="items"){var aj=$("#"+y).find(".ui-pg-div span.fa-pencil");if(aj.size()>0){aj.click()}else{$("#"+y).find("i.fa-credit-card").parent("a").click()}}}al.stopPropagation()},editcol:"display"},p);if($.isFunction(C.url)){C.url=C.url.call(Z)}if(C.url==undefined){C.url=Z.attr("data-url")}if(C.url==undefined){C.datatype="local"}if(BooleanUtil.toBoolean(Z.attr("data-readonly"))){C.inlineNav.add=false;C.inlineNav.edit=false;C.inlineNav.del=false}if(C.pager==undefined||C.pager){y=Z.attr("id")+"_pager";$("<div id='"+y+"'/>").insertAfter(Z);C.pager="#"+y}else{C.toppager=false}if(C.toppager){C.toppager="#"+Z.attr("id")+"_toppager"}if(C.treeGrid){C.rownumbers=false}if(p.editurl==undefined&&d=="items"){C.editurl="clientArray"}if(p.delurl==undefined&&d=="items"){C.delurl="clientArray"}if(C.editurl=="clientArray"){C.cellsubmit=C.editurl}else{C.cellurl=C.editurl}var I=0;var H=false;var J=[];var h=[];$.each(C.colModel,function(ai,c){h.push(c.name)});if($.inArray("id",h)){C.colModel.push({label:"流水号",name:"id",width:50,hidden:true});if(C.colNames){C.colNames.push("流水号")}}if($.inArray("createdBy",h)){C.colModel.push({label:"创建者",name:"createdBy",width:50,align:"center",hidden:true});if(C.colNames){C.colNames.push("创建者")}}if($.inArray("createdDate",h)){C.colModel.push({label:"创建时间",name:"createdDate",formatter:"timestamp",hidden:true});if(C.colNames){C.colNames.push("创建时间")}}if($.inArray("lastModifiedBy",h)){C.colModel.push({label:"最后更新者",name:"lastModifiedBy",width:50,align:"center",hidden:true});if(C.colNames){C.colNames.push("最后更新者")}}if($.inArray("lastModifiedDate",h)){C.colModel.push({label:"最后更新时间",name:"lastModifiedDate",formatter:"timestamp",hidden:true});if(C.colNames){C.colNames.push("最后更新时间")}}C.colModel.push({label:"标题",name:"display",hidden:true,search:false,hidedlg:true});if(C.colNames){C.colNames.push("标题")}$.each(C.colModel,function(ak,aj){if(aj.frozen){H=true}aj=$.extend(true,{},{editoptions:{rows:1},searchoptions:{clearSearch:false,searchhidden:true,defaultValue:"",buildSelect:function(at){if(at==null){at=data}var ar="<select>";ar+="<option value=''></option>";for(var aq in at){aq=aq+"";ar+=("<option value='"+aq+"'>"+at[aq]+"</option>")}ar+="</select>";return ar}}},aj);if(aj.name.toLowerCase()=="todo"){aj.formatter=function(at,aq,au,ar){return"TODO"}}if(aj.responsive){if(aj.hidden==undefined){var ai=$(window).width();var al=aj.responsive;if(al=="sm"){if(ai<768){aj.hidden=true}}else{if(al=="md"){if(ai<992){aj.hidden=true}}else{if(al=="lg"){if(ai<1200){aj.hidden=true}}}}}}if(aj.formatter=="currency"){aj=$.extend({},{width:80,align:"right"},aj);aj.formatoptions=$.extend({},aj.formatoptions,{decimalSeparator:".",thousandsSeparator:",",decimalPlaces:2,prefix:"",defaultValue:""});aj.searchoptions=$.extend({},aj.searchoptions,{sopt:["eq","ne","ge","le","gt","lt"]})}if(aj.formatter=="percentage"){aj=$.extend(true,{width:50,align:"right"},aj);aj.formatter=function(at,aq,au,ar){if(at){return Math.round(at*10000)/100+"%"}else{return at}}}if(aj.stype=="date"||aj.sorttype=="date"||aj.formatter=="date"||aj.formatter=="timestamp"||aj.formatter=="shortTimestamp"){if(aj.formatter=="timestamp"){aj=$.extend(true,{width:150,fixed:true,align:"center",formatoptions:{srcformat:"Y-m-d H:i:s",newformat:"Y-m-d H:i:s"}},aj);aj.formatter="date"}else{if(aj.formatter=="shortTimestamp"){aj=$.extend(true,{width:150,fixed:true,align:"center",formatoptions:{srcformat:"Y-m-d H:i",newformat:"Y-m-d H:i"}},aj);aj.formatter="date"}else{aj=$.extend(true,{width:120,fixed:true,align:"center",formatoptions:{newformat:"Y-m-d"}},aj)}}aj.searchoptions=$.extend({},aj.searchoptions,{sopt:["bt","eq","ne","ge","le","gt","lt"],dataInit:function(ar){var aq=$(ar);$(ar).daterangepicker($.extend(true,$.fn.daterangepicker.defaults,aj.searchoptions.daterangepicker),function(au,at){$(ar).focus();Z.trigger("triggerToolbar")});$(ar).off("focus")}});aj.editoptions=$.extend(aj.editoptions,{dataInit:function(aq){if(aj.editoptions.time){$(aq).datetimepicker({language:"zh-CN",autoclose:true,todayBtn:true,minuteStep:10,format:"yyyy-mm-dd hh:ii"})}else{$(aq).datepicker({language:"zh-CN",autoclose:true,todayBtn:true,format:"yyyy-mm-dd"})}}})}if(aj.formatter=="showlink"){aj=$.extend(true,{formatoptions:{idValue:"id",target:"modal-ajaxify"}},aj)}if(aj.formatter=="integer"){aj=$.extend(true,{width:60,align:"center",formatoptions:{defaultValue:"",thousandsSeparator:""},searchoptions:{sopt:["eq","ne","ge","le","gt","lt"]}},aj)}if(aj.formatter=="number"){aj.sorttype=aj.formatter;aj.edittype=aj.formatter;aj=$.extend(true,{width:60,align:"right",formatoptions:{defaultValue:""},searchoptions:{sopt:["eq","ne","ge","le","gt","lt"]}},aj)}if(aj.name=="id"){aj=$.extend(true,{width:80,align:"center",title:false,formatter:function(au,ar,aw,at){if(au&&au.length>10){var aq=au.length;var av=au.substring(aq-5,aq);return"<span data='"+au+"' onclick='$(this).html($(this).attr(\"data\"))'>..."+av+"</span>"}else{return au}},frozen:true},aj);aj.searchoptions=$.extend(true,aj.searchoptions,{sopt:["eq","ne","ge","le","gt","lt"]})}if(aj.formatter=="checkbox"){aj.edittype=aj.formatter;aj=$.extend(true,{width:60,align:"center",formatter:"checkbox",stype:"select"},aj);aj.searchoptions.value={"":"","true":"是","false":"否"};aj.searchoptions.sopt=["eq","ne"];aj.editoptions.value="true:false"}if(aj.edittype==undefined||aj.edittype=="text"||aj.edittype=="select"||aj.edittype=="textarea"){var c=aj.editoptions.dataInit;aj.editoptions=$.extend(aj.editoptions,{dataInit:function(ar){var aq=$(ar);aq.removeClass("editable").addClass("form-control").attr("autocomplete","off").css({width:"100%"});if(c){c.call(this,ar)}if(aj.editoptions.updatable==false){var at=Z.jqGrid("getSelectedRowdata");if(at&&at.id){aq.attr("disabled",true)}else{if(!aq.attr("placeholder")){aq.attr("placeholder","创建后不可修改");aq.attr("title","创建后不可修改")}}}if(aq.is("input[type='text']")){aq.blur(function(){aq.val($.trim(aq.val()))})}if(aq.is("select")){aq.select2({openOnEnter:false,placeholder:"请选择...",matcher:function(av,ay){var au=Pinyin.getCamelChars(ay)+"";var ax=au.toUpperCase().indexOf(av.toUpperCase())==0;var aw=ay.toUpperCase().indexOf(av.toUpperCase())==0;return(ax||aw)}})}if(aj.editoptions.spellto){aq.change(function(){var au={};au[aj.editoptions.spellto]=Pinyin.getCamelChars($.trim(aq.val()));Z.jqGrid("setEditingRowdata",au)})}}})}if(aj.formatter=="select"){if(aj.searchoptions.sopt==undefined){aj.searchoptions.sopt=["eq","ne"]}if(aj.edittype==undefined){aj.edittype="select"}if(aj.stype==undefined){aj.stype="select"}if(typeof aj.searchoptions.value==="function"){aj.searchoptions.value=aj.searchoptions.value.call(Z)}if(aj.searchoptions.valueJsonString){aj.searchoptions.value={"":""};var ap=$.parseJSON(aj.searchoptions.valueJsonString);for(var ao in ap){aj.searchoptions.value[ao]=ap[ao]}}aj.editoptions=$.extend(true,{value:aj.searchoptions.value},aj.editoptions)}if(!aj.hidden){if(aj.width){I+=aj.width}else{I+=300}}if(aj.hasOwnProperty("searchoptions")){var am=aj.searchoptions;if(am.hasOwnProperty("defaultValue")&&am.defaultValue!=""){var an=aj.index;if(an==undefined){an=aj.name}J[J.length++]={field:an,op:aj.searchoptions.sopt[0],data:am.defaultValue}}}if(aj.searchoptions.sopt==undefined){aj.searchoptions.sopt=["cn","bw","bn","eq","ne","nc","ew","en"]}if(aj.index==undefined){if(aj.formatter=="date"||aj.formatter=="timestamp"){aj.index=aj.name+"@Date"}else{if(aj.formatter=="checkbox"){aj.index=aj.name+"@Boolean"}else{if(aj.formatter=="integer"||aj.formatter=="currency"||aj.formatter=="number"||aj.formatter=="percentage"){aj.index=aj.name+"@Number"}}}}C.colModel[ak]=aj});if(d=="items"){C.colModel.push({name:"extraAttributes.dirtyRow",hidden:true,hidedlg:true});if(C.colNames){C.colNames.push("extraAttributes.dirtyRow")}C.colModel.push({name:"_arrayIndex",hidedlg:true,hidden:true});if(C.colNames){C.colNames.push("_arrayIndex")}C.colModel.push({name:"extraAttributes.operation",hidedlg:true,hidden:true});if(C.colNames){C.colNames.push("extraAttributes.operation")}}var n=$(".theme-panel .grid-shrink-option").val();if(n=="true"){C.shrinkToFit=true}else{if(Number(I)>Number(Z.parent().width())){$.each(C.colModel,function(ai,c){if(!c.hidden){if(c.width==undefined){c.width=300}}});C.shrinkToFit=false}}var Y=false;if(Z.closest(".ui-subgrid").size()==0&&d!="items"){if(C.height==undefined||C.height=="stretch"){Y=true;C.height=0}}if(C.filterToolbar){if(C.postData==undefined){C.postData={}}var t=C.postData;var r={};if(t.hasOwnProperty("filters")){r=JSON.parse(t.filters)}var m=[];if(r.hasOwnProperty("rules")){m=r.rules}$.each(J,function(ai,c){var aj=false;$.each(m,function(ak,al){if(c.field==al.field){aj=true;return}});if(aj==false){m.push(c)}});if(m.length>0){r.groupOp="AND";r.rules=m;t._search=true;t.filters=JSON.stringify(r)}}if(C.jqPivot){var G=C.jqPivot;delete C.jqPivot;var g=C.url;C={multiselect:false,pager:C.pager,shrinkToFit:false};Z.jqGrid("jqPivot",g,G,C,{reader:"content"});return}else{Z.jqGrid(C)}if(C.filterToolbar){Z.jqGrid("filterToolbar",C.filterToolbar);var u=$("#jqgh_"+Z.attr("id")+"_rn");var F='<a href="javascript:;" title="显示快速查询"><span class="ui-icon ui-icon-carat-1-s"></span></a>';var N='<a href="javascript:;" title="隐藏快速查询"><span class="ui-icon ui-icon-carat-1-n"></span></a>';if(Z.is(".ui-jqgrid-subgrid")||C.filterToolbar=="hidden"){u.html(F);Z[0].toggleToolbar()}else{u.html(N)}u.on("click",".ui-icon-carat-1-s",function(){u.html(N);Z[0].toggleToolbar()});u.on("click",".ui-icon-carat-1-n",function(){u.html(F);Z[0].toggleToolbar()})}if(C.setGroupHeaders){Z.jqGrid("setGroupHeaders",$.extend(true,{useColSpanStyle:true},C.setGroupHeaders))}Z.bindKeys({upKey:false,downKey:false,onEnter:function(ai){if(ai==undefined){return}Z.find("tr.jqgrow").attr("tabindex",-1);var c=Z.find("tr.jqgrow[id='"+ai+"']");c.attr("tabindex",0);if(C.editurl){if(c.attr("editable")=="1"){D.find(".ui-pg-div span.fa-floppy-o").click()}else{D.find(".ui-pg-div span.fa-pencil").click()}return false}}});if(C.pager||C.toppager){var D=$(C.pager);var ah=Util.notSmallViewport();if(ah){ah=(d=="items"?false:true)}var ab=Util.notSmallViewport();if(ab){ab=(d=="items"?false:true)}Z.jqGrid("navGrid",C.pager,{edit:false,add:false,del:false,refresh:ah,search:ah,position:"left",cloneToTop:true});var Q=C.navButtons;if(Q==undefined||Q==false){Q=[]}else{if(!Array.isArray(Q)){Q=[Q]}}if(C.columnChooser){Z.jqGrid("showHideColumnMenu");Q.push({caption:"设定显示列和顺序",buttonicon:"fa-th-list",onClickButton:function(){var c=Z.jqGrid("getGridParam","width");Z.jqGrid("columnChooser",{width:470,done:function(ai){if(ai){this.jqGrid("remapColumns",ai,true);Z.jqGrid("setGridWidth",c,false)}else{}}})},operationRows:9,showOnToolbar:false})}Q.push({caption:"收缩显示模式",buttonicon:"fa-list-alt",onClickButton:function(){var c=Z.jqGrid("getGridParam","width");Z.jqGrid("destroyFrozenColumns");Z.jqGrid("setGridWidth",c,true)},operationRows:9,showOnToolbar:false});var ag=Util.notSmallViewport();if(ag){ag=(d=="items"?false:true)}if(C.exportExcelLocal&&ag){Q.push({caption:"导出当前显示数据",buttonicon:"fa-file-excel-o",onClickButton:function(){Z.jqGrid("exportExcelLocal",C.exportExcelLocal)},operationRows:9,showOnToolbar:false})}if(C.gridDnD){var ac=$.extend(true,{dropbyname:true,beforedrop:function(c,aj,ai){ai.id=$(aj.draggable).attr("id");return ai},autoid:function(c){return c.id},drop_opts:{activeClass:"ui-state-active",hoverClass:"ui-state-hover",greedy:true},ondrop:function(c,al,ao){var ap=$("#"+this.id);var aq=ap.closest(".ui-subgrid");var ak="";if(aq.size()>0){ak=aq.prev(".jqgrow").attr("id")}var ai=$(al.draggable).attr("id");var am={};var an=ap.jqGrid("getGridParam","parent");var aj=ap.jqGrid("getGridParam","editurl");if(aj){am[an]=ak;am.id=ai;ap.ajaxPostURL({url:aj,success:function(){return true},confirmMsg:false,data:am})}}},C.gridDnD);Q.push({caption:"开启拖放移动模式",buttonicon:"fa-arrows",onClickButton:function(){var c=null;if(Z.closest(".ui-subgrid").size()>0){$topGrid=Z.parent().closest(".ui-jqgrid-btable:not(.ui-jqgrid-subgrid)");c=$topGrid.parent().find(".ui-jqgrid-btable")}else{c=Z.parent().find(".ui-jqgrid-btable")}var aj=[];c.each(function(ak,al){aj.push("#"+$(this).attr("id"))});var ai=aj.reverse();$.each(ai,function(al,ao){var an=$.map(aj,function(ap){return ap!=ao?ap:null});var ak=$(ao);if(an.length>0){var am=$.extend({connectWith:an.join(",")},ac);ak.jqGrid("gridDnD",am)}if(!ak.hasClass("ui-jqgrid-dndtable")){ak.addClass("ui-jqgrid-dndtable")}})},operationRows:0,showOnToolbar:true})}if(C.viewurl){Q.push({caption:"查看详情",buttonicon:"fa-edit",onClickButton:function(aj){var c="TBD";var ak=Z.jqGrid("getRowData",aj);if(C.editcol){c=ak[C.editcol];if(c.indexOf("<")>-1&&c.indexOf(">")>-1){c=$(c).text()}}else{c=ak.id;if(c.indexOf("<span")>-1){c=$(c).text()}}var ai=Util.AddOrReplaceUrlParameter(C.viewurl,"id",aj);$view.popupDialog({title:"查看: "+c,url:ai})},operationRows:1})}if(C.fullediturl){if(C.addable==undefined||C.addable!=false){Q.push({caption:"表单新增数据",buttonicon:"fa-plus-square-o",onClickButton:function(){Z.popupDialog({title:"新增",url:C.fullediturl})},operationRows:0,showOnToolbar:true})}Q.push({caption:"表单编辑数据",buttonicon:"fa-edit",onClickButton:function(aj){var c=Z.find("tr#"+aj+" > td.jqgrid-rownum").html();var ai=Util.AddOrReplaceUrlParameter(C.fullediturl,"id",aj);Z.popupDialog({url:ai,title:"编辑："+c})},title:"可双击行项进行编辑数据",badge:"双击",operationRows:1,showOnToolbar:true,showOnDropdown:true})}if(C.delurl){Q.push({caption:"删除选择数据",buttonicon:"fa-trash-o",onClickButton:function(aj){if(C.delurl==undefined||C.delurl=="clientArray"){$.each(aj,function(al,ao){if(Util.startWith(ao,"-")){Z.jqGrid("delRowData",ao)}else{var am=Z.find("#"+ao);var an=Z.jqGrid("getRowData",ao);for(var ak in an){if(ak=="id"||Util.endWith(ak,".id")||ak=="_arrayIndex"){}else{if(ak=="extraAttributes.dirtyRow"){an[ak]=true}else{if(ak=="extraAttributes.operation"){an[ak]="remove"}else{an[ak]=""}}}}Z.jqGrid("setRowData",ao,an);am.hide()}})}else{if(aj){var c="id";if(C.multiselect){c="ids"}var ai=Util.AddOrReplaceUrlParameter(C.delurl,c,aj.join(","));Z.ajaxPostURL({url:ai,success:function(ak){$.each(aj,function(al,an){var an=$.trim(an);if(ak.data&&ak.data[an]){var am=Z.find("tr.jqgrow[id='"+an+"']");var ao=ak.data[an];am.pulsate({color:"#bf1c56",repeat:3})}else{Z.jqGrid("delRowData",an)}})},confirmMsg:"确认批量删除所选记录吗？"})}}},title:"勾选并批量删除数据",operationRows:2,showOnToolbar:true,showOnDropdown:true})}if(C.pager&&(C.inlineNav.add||C.inlineNav.edit||C.inlineNav.del)&&C.inlineNav!=false){Z.jqGrid("navSeparatorAdd",undefined,{position:"last"});Z.jqGrid("inlineNav",C.inlineNav)}var M=false;$.each(Q,function(c,ai){ai=$.extend({buttonicon:"fa-edit",onClickButton:function(ak){},position:"last",cursor:"pointer",operationRows:0,showOnToolbar:true,showOnDropdown:true},ai);if(!ai.title){ai.title=ai.caption}var aj=ai.onClickButton;ai.onClickButton=function(al){var ak=$(this);if(ai.operationRows==1){var an=ak.getOnlyOneSelectedItem(true);if(an){aj.call(ak,an,al)}}else{if(ai.operationRows>1&&ai.operationRows<9){var am=ak.getAtLeastOneSelectedItem(true);if(am){aj.call(ak,am,al)}}else{aj.call(ak,al)}}};Q[c]=ai;if(ai.showOnToolbar){if(M==false){M=true;Z.jqGrid("navSeparatorAdd",undefined,{position:"last"})}Z.jqGrid("navButtonAdd",$.extend({},ai,{caption:false}))}});Z.jqGrid("navSeparatorAdd",undefined,{position:"first"});var B=[];B.push('<div class="btn-group btn-group-more-option" style="margin-left: 3px;margin-right: 3px;">');B.push('<button type="button" class="btn btn-xs default dropdown-toggle" data-toggle="dropdown">');B.push('更多操作 <i class="fa fa-angle-down"></i>');B.push("</button>");B.push('<ul class="dropdown dropdown-menu" role="menu">');B.push("</ul>");B.push("</div>");Z.jqGrid("navButtonAdd",{caption:"",buttonicon:"fa-more-option",position:"first",title:"更多操作"});var T=Z.closest("div.ui-jqgrid");var b=T.find(".fa-more-option").parent().parent();b.replaceWith(B.join(""));var W=T.find(".ui-jqgrid-pager .btn-group-more-option");W.addClass("dropup");Q.sort(function(ai,c){return ai.operationRows-c.operationRows});var w=T.find(".btn-group-more-option").find("ul");$.each(Q,function(ai,aj){if(aj.showOnDropdown){var c='<i class="fa '+aj.buttonicon+'"></i> '+aj.caption;if(aj.badge){c=c+'<span class="badge badge-info"> '+aj.badge+" </span>"}var ak=$('<li data-type="'+aj.operationRows+'"><a tabindex="-1" href="javascript:;">'+c+"</a> </li>");ak.children("a").bind("click",function(){aj.onClickButton.call(Z)});ak.appendTo(w)}});var x=w.find('li[data-type="0"]').size(),aa=w.find('li[data-type="1"]').size();var l=w.find('li[data-type="2"]').size(),E=w.find('li[data-type="9"]').size();if(x>0&&(aa>0||l>0)){w.find('li[data-type="0"]:last').after('<li class="divider"> </li>')}if(aa>0&&(l>0||E>0)){w.find('li[data-type="1"]:last').after('<li class="divider"> </li>')}if(l>0&&E>0){w.find('li[data-type="2"]:last').after('<li class="divider"> </li>')}if(C.pager&&C.toppager){if(Z.closest(".ui-subgrid").size()>0){$(C.pager).hide()}}var P=$(".theme-panel .context-menu-option").val();if(P=="enable"&&C.contextMenu&&L.find("li").length>0){var S=$('<div id="'+R+'" class="context-menu"></div>');L.clone().appendTo(S);$("body").append(S);Z.unbind("contextmenu")}}var A=K.jqGrid("getGridParam","colModel");for(var V=0;V<A.length;V++){var af=A[V];if(af.tooltips){var X=$('<span class="glyphicon glyphicon-exclamation-sign tooltipster"  title="'+af.tooltips+'"></span>');var o=af.index?af.index:af.name;var U=$(".ui-jqgrid-sortable[id*='"+o+"']",q);if(U.size()>0){U.prepend(X);X.tooltipster({contentAsHTML:true,offsetY:5,theme:"tooltipster-punk"})}}}var ae=C.editrulesurl;if(ae){var q=$("#gbox_"+K.attr("id")+"  .ui-jqgrid-labels");q.ajaxJsonUrl(ae,function(al){var ai=K.jqGrid("getGridParam","colModel");for(var ak in al){for(var aj=0;aj<ai.length;aj++){var ao=ai[aj];if((ao.index&&ao.index==ak)||(ao.name&&ao.name==ak)){ai[aj].editrules=$.extend(al[ak]||{},ai[aj].editrules||{});if(ai[aj].editrules.required==undefined){ai[aj].editrules.required=false}delete ao.editrules.timestamp;delete ao.editrules.shortTimestamp;if(ao.editrules.tooltips&&ao.tooltips==undefined){var an=$('<span class="glyphicon glyphicon-exclamation-sign tooltipster"  title="'+ao.editrules.tooltips+'"></span>');var am=$(".ui-jqgrid-sortable[id*='"+ak+"']",q);if(am.size()>0){am.prepend(an);an.tooltipster({contentAsHTML:true,offsetY:5,theme:"tooltipster-punk"})}delete ao.editrules.tooltips}break}}}})}if(Y){var s=$("#gbox_"+K.attr("id"));var ad=0;var O="div.ui-jqgrid-titlebar,div.ui-jqgrid-hdiv,div.ui-jqgrid-pager,div.ui-jqgrid-toppager,div.ui-jqgrid-sdiv";s.find(O).filter(":visible").each(function(){ad+=$(this).outerHeight()});ad=ad+50;var f=$(window).height()-Z.closest(".ui-jqgrid").offset().top-ad;if(f<300){f=300}Z.setGridHeight(f,true)}Grid.refreshWidth();if(H){Z.jqGrid("setFrozenColumns")}Z.jqGrid("gridResize",{minWidth:500,minHeight:100});Z.closest(".ui-jqgrid").find(".ui-resizable-s").dblclick(function(){var c=Z.jqGrid("getGridParam","height");Z.jqGrid("setGridHeight",Z.height()+17)}).attr("title","鼠标双击可自动扩展显示区域")},refreshWidth:function(){$("table.ui-jqgrid-btable:visible").each(function(){var c=$(this);var d=c.jqGrid("getGridParam","width");var b=c.closest("div.ui-jqgrid").parent("div").width();if(d!=b){c.jqGrid("setGridWidth",b);var e=$(this).jqGrid("getGridParam","groupHeader");if(e){c.jqGrid("destroyGroupHeader");c.jqGrid("setGroupHeaders",e)}}})},initRecursiveSubGrid:function(f,c,e,h){var b=$("<table data-grid='table' class='ui-jqgrid-subgrid'/>").appendTo($("#"+f));var d=b.closest("table.ui-jqgrid-btable").data("gridOptions");d.url=Util.AddOrReplaceUrlParameter(d.url,"search['EQ_"+e+"']",c);if(d.fullediturl){d.fullediturl=Util.AddOrReplaceUrlParameter(d.fullediturl,e,c)}d.inlineNav=$.extend(true,{addParams:{addRowParams:{extraparam:{}}}},d.inlineNav);d.inlineNav.addParams.addRowParams.extraparam[e]=c;d.parent=e;if(h){d.postData={}}b.data("gridOptions",d);Grid.initGrid(b);var g=$("#"+f).parent().closest(".ui-jqgrid-btable:not(.ui-jqgrid-subgrid)");if(d.gridDnD&&g.hasClass("ui-jqgrid-dndtable")){$("#"+f).find(".ui-icon-arrow-4:first").click()}},initSubGrid:function(e,d,c){var b=$("<table data-grid='table' class='ui-jqgrid-subgrid'/>").appendTo($("#"+e));b.data("gridOptions",c);Grid.initGrid(b)}}}();