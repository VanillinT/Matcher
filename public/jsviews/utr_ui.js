function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function utr_ui(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ctr class=\"d-flex\"\u003E\u003Ctd class=\"col-4 p-0\"\u003E\u003Cdiv class=\"input-group\"\u003E\u003Cdiv class=\"custom-file\"\u003E\u003Cinput" + (" class=\"custom-file-input rounded-0\""+" type=\"file\""+pug_attr("id", 'selected_file_' + locals.id, true, false)) + "\u002F\u003E\u003Clabel" + (" class=\"custom-file-label rounded-0 overflow-hidden\""+pug_attr("for", 'selected_file_' + locals.id, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = locals.file ? locals.file.originalname : 'Выберите файл') ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd class=\"col-4 p-0\"\u003E\u003Cdiv class=\"input-group\"\u003E\u003Cinput" + (" class=\"form-control rounded-0\""+" type=\"text\""+pug_attr("value", (locals.file ? locals.file.originalname : ''), true, false)+pug_attr("id", 'selected_folder_' + locals.id, true, false)) + "\u002F\u003E\u003C!--.input-group-appendbutton.btn.btn-outline-secondary.rounded-0(id='browse_folder_' + locals.id)\n\timg(src='\u002Fopen-iconic\u002Fsvg\u002Fmagnifying-glass.svg').icon--\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd class=\"col p-0\"\u003E\u003Cdiv class=\"input-group\"\u003E\u003Cselect" + (" class=\"custom-select rounded-0\""+pug_attr("id", 'selected_type_' + locals.id, true, false)) + "\u003E\u003Coption" + (pug_attr("selected", true, true, false)+" value=\"\"") + "\u003E" + (pug_escape(null == (pug_interp = 'Выберите тип...') ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
// iterate locals.folders
;(function(){
  var $$obj = locals.folders;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var folder = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption\u003E" + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption\u003E" + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";;return pug_html;}