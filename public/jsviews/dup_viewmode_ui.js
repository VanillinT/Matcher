function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function dup_viewmode_ui(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"px-5\"\u003E\u003Cdiv class=\"d-block\"\u003E\u003Cdiv class=\"media\"\u003E\u003Cimg class=\"align-self-center icon\" src=\"open-iconic\u002Fsvg\u002Ffolder.svg\"\u002F\u003E\u003Cdiv class=\"media-body\"\u003E\u003Clabel class=\"px-2 m-auto\"\u003E" + (pug_escape(null == (pug_interp = 'App') ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mx-4 d-block\"\u003E";
// iterate locals.content
;(function(){
  var $$obj = locals.content;
  if ('number' == typeof $$obj.length) {
      for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
        var folder = $$obj[i];
pug_html = pug_html + "\u003Cdiv class=\"media\"\u003E\u003Cimg class=\"align-self-center icon\" src=\"open-iconic\u002Fsvg\u002Ffolder.svg\"\u002F\u003E\u003Cdiv class=\"media-body\"\u003E\u003Clabel class=\"px-2 m-auto\"\u003E" + (pug_escape(null == (pug_interp = folder.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mx-4\"\u003E";
// iterate folder.files
;(function(){
  var $$obj = folder.files;
  if ('number' == typeof $$obj.length) {
      for (var j = 0, $$l = $$obj.length; j < $$l; j++) {
        var file = $$obj[j];
pug_html = pug_html + "\u003Ctable class=\"table table-hover table-borderless table-sm m-0\"\u003E\u003Ctbody class=\"d-inline\"\u003E\u003Ctr" + (pug_attr("id", 'row_' + i + j, true, false)) + "\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cimg class=\"icon\" src=\"open-iconic\u002Fsvg\u002Ffile.svg\"\u002F\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Clabel class=\"m-auto\"\u003E" + (pug_escape(null == (pug_interp = file.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cdiv" + (" class=\"d-none\""+pug_attr("id", 'controls_for_row_' + i + j, true, false)) + "\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Feye.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Fdata-transfer-download.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Ftrash.svg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
      }
  } else {
    var $$l = 0;
    for (var j in $$obj) {
      $$l++;
      var file = $$obj[j];
pug_html = pug_html + "\u003Ctable class=\"table table-hover table-borderless table-sm m-0\"\u003E\u003Ctbody class=\"d-inline\"\u003E\u003Ctr" + (pug_attr("id", 'row_' + i + j, true, false)) + "\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cimg class=\"icon\" src=\"open-iconic\u002Fsvg\u002Ffile.svg\"\u002F\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Clabel class=\"m-auto\"\u003E" + (pug_escape(null == (pug_interp = file.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cdiv" + (" class=\"d-none\""+pug_attr("id", 'controls_for_row_' + i + j, true, false)) + "\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Feye.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Fdata-transfer-download.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Ftrash.svg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;
      var folder = $$obj[i];
pug_html = pug_html + "\u003Cdiv class=\"media\"\u003E\u003Cimg class=\"align-self-center icon\" src=\"open-iconic\u002Fsvg\u002Ffolder.svg\"\u002F\u003E\u003Cdiv class=\"media-body\"\u003E\u003Clabel class=\"px-2 m-auto\"\u003E" + (pug_escape(null == (pug_interp = folder.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mx-4\"\u003E";
// iterate folder.files
;(function(){
  var $$obj = folder.files;
  if ('number' == typeof $$obj.length) {
      for (var j = 0, $$l = $$obj.length; j < $$l; j++) {
        var file = $$obj[j];
pug_html = pug_html + "\u003Ctable class=\"table table-hover table-borderless table-sm m-0\"\u003E\u003Ctbody class=\"d-inline\"\u003E\u003Ctr" + (pug_attr("id", 'row_' + i + j, true, false)) + "\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cimg class=\"icon\" src=\"open-iconic\u002Fsvg\u002Ffile.svg\"\u002F\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Clabel class=\"m-auto\"\u003E" + (pug_escape(null == (pug_interp = file.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cdiv" + (" class=\"d-none\""+pug_attr("id", 'controls_for_row_' + i + j, true, false)) + "\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Feye.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Fdata-transfer-download.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Ftrash.svg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
      }
  } else {
    var $$l = 0;
    for (var j in $$obj) {
      $$l++;
      var file = $$obj[j];
pug_html = pug_html + "\u003Ctable class=\"table table-hover table-borderless table-sm m-0\"\u003E\u003Ctbody class=\"d-inline\"\u003E\u003Ctr" + (pug_attr("id", 'row_' + i + j, true, false)) + "\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cimg class=\"icon\" src=\"open-iconic\u002Fsvg\u002Ffile.svg\"\u002F\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Clabel class=\"m-auto\"\u003E" + (pug_escape(null == (pug_interp = file.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fth\u003E\u003Cth class=\"d-inline-block\"\u003E\u003Cdiv" + (" class=\"d-none\""+pug_attr("id", 'controls_for_row_' + i + j, true, false)) + "\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Feye.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Fdata-transfer-download.svg\"\u002F\u003E\u003Cimg class=\"mx-1 icon\" src=\"open-iconic\u002Fsvg\u002Ftrash.svg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}