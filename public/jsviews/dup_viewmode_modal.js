function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function dup_viewmode_modal(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"aria-hidden\"\u003E\u003Cdiv class=\"modal-dialog\" role=\"document\"\u003E\u003Cdiv class=\"modal-content\"\u003E\u003Cdiv class=\"modal-header\"\u003E\u003Ch5\u003E" + (pug_escape(null == (pug_interp = 'Просмотр файла ' + locals.filename) ? "" : pug_interp)) + "\u003C\u002Fh5\u003E\u003Cbutton class=\"close\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\"\u003E\u003Cspan aria-hidden=\"aria-hidden\"\u003E" + (pug_escape(null == (pug_interp = '╳') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-body\"\u003E\u003Cdiv id=\"text_box\"\u003E" + (pug_escape(null == (pug_interp = locals.text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-footer\"\u003E\u003Cbutton class=\"btn btn-secondary\" type=\"button\" data-dismiss=\"modal\"\u003E" + (pug_escape(null == (pug_interp = 'Закрыть') ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-primary\" type=\"button\" id=\"btn_edit\"\u003E" + (pug_escape(null == (pug_interp = 'Изменить') ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-primary\" type=\"button\" id=\"btn_save\"\u003E" + (pug_escape(null == (pug_interp = 'Сохранить') ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;}