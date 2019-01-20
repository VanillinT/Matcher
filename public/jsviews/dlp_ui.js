function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function dlp_ui(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ctable class=\"table table-bordered table-sm\"\u003E\u003Cthead\u003E\u003Ctr\u003E\u003Cth scope=\"col\"\u003E" + (pug_escape(null == (pug_interp = '#') ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Cth scope=\"col\"\u003E" + (pug_escape(null == (pug_interp = 'Шаблон') ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Cth scope=\"col\"\u003E" + (pug_escape(null == (pug_interp = 'Данные') ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Cth scope=\"col\"\u003E" + (pug_escape(null == (pug_interp = 'Разделитель') ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Cth scope=\"col\"\u003E" + (pug_escape(null == (pug_interp = 'Новая строка') ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Cth scope=\"col\"\u003E" + (pug_escape(null == (pug_interp = 'Активно') ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003Ctbody id=\"tbody\"\u003E\u003C\u002Ftbody\u003E\u003C\u002Fthead\u003E\u003C\u002Ftable\u003E\u003Cdiv\u003E\u003Cbutton class=\"btn btn-secondary mx-auto d-block\" style=\"width:150px\" id=\"add_dtr\"\u003E" + (pug_escape(null == (pug_interp = '+') ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"input-group p-3 fixed-bottom\" id=\"footer\"\u003E\u003Cdiv\u003E\u003Cdiv class=\"input-group\" style=\"width:140%\"\u003E\u003Cdiv class=\"input-group-prepend\"\u003E\u003Clabel class=\"input-group-text\"\u003E" + (pug_escape(null == (pug_interp = 'Целевой путь:') ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cinput class=\"form-control rounded-0\" type=\"text\" value=\"app\u002FModels\" id=\"selected_path\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-block\"\u003E\u003Cbutton class=\"btn btn-secondary m-auto position-absolute\" type=\"button\" style=\"right:30px\" id=\"btn_start\"\u003E" + (pug_escape(null == (pug_interp = 'Начать') ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}