function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function file_list_modal(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (row) {pug_html = pug_html + "\u003Cdiv class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"aria-hidden\" id=\"modal\"\u003E\u003Cdiv class=\"modal-dialog\" role=\"document\"\u003E\u003Cdiv class=\"modal-content\"\u003E\u003Cdiv class=\"modal-header\"\u003E\u003Ch5\u003E" + (pug_escape(null == (pug_interp = 'Выбор файла в '+ locals.type) ? "" : pug_interp)) + "\u003C\u002Fh5\u003E\u003Cbutton class=\"close\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\"\u003E\u003Cspan aria-hidden=\"aria-hidden\"\u003E" + (pug_escape(null == (pug_interp = '╳') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-body\"\u003E\u003Ctable class=\"table table-hover\" id=\"file_list\"\u003E\u003Ctbody\u003E";
// iterate locals.files
;(function(){
  var $$obj = locals.files;
  if ('number' == typeof $$obj.length) {
      for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
        var file = $$obj[i];
pug_html = pug_html + "\u003Ctr" + (pug_attr("id", 'modal_row_' + i+1, true, false)) + "\u003E\u003Cth" + (pug_attr("scope", row, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = i+1) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Ctd\u003E" + (pug_escape(null == (pug_interp = file) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;
      var file = $$obj[i];
pug_html = pug_html + "\u003Ctr" + (pug_attr("id", 'modal_row_' + i+1, true, false)) + "\u003E\u003Cth" + (pug_attr("scope", row, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = i+1) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Ctd\u003E" + (pug_escape(null == (pug_interp = file) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"row" in locals_for_with?locals_for_with.row:typeof row!=="undefined"?row:undefined));;return pug_html;}