function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function dup_ui(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"overflow-auto\" id=\"dup_container\"\u003E\u003Cdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"input-group p-3 fixed-bottom\" id=\"footer\"\u003E\u003Cdiv\u003E\u003Cdiv class=\"btn-group btn-group-toggle d-block m-auto\" data-toggle=\"buttons\" id=\"modetoggles\"\u003E\u003Clabel class=\"rounded-0 btn btn-outline-secondary\"\u003E" + (pug_escape(null == (pug_interp = 'Режим просмотра') ? "" : pug_interp)) + "\u003Cinput id=\"viewmoderadio\" type=\"radio\" name=\"view\" autocomplete=\"off\"\u002F\u003E\u003C\u002Flabel\u003E\u003Clabel class=\"rounded-0 btn btn-outline-secondary active\"\u003E" + (pug_escape(null == (pug_interp = 'Режим загрузки') ? "" : pug_interp)) + "\u003Cinput" + (" id=\"upmoderadio\" type=\"radio\" name=\"up\" autocomplete=\"off\""+pug_attr("checked", true, true, false)) + "\u002F\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-block\"\u003E\u003Cbutton class=\"btn btn-secondary m-auto position-absolute\" type=\"button\" style=\"right:30px\" id=\"btn_upload\"\u003E" + (pug_escape(null == (pug_interp = 'Загрузить') ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}