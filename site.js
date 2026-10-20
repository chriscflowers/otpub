function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function sorted(){return (window.RESEARCH||[]).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)))}
function href(r){return r.url?r.url:'note.html?n='+encodeURIComponent(r.slug)}
function fmt(d){const t=new Date(d+'T00:00:00');return isNaN(t)?'':t.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}
function card(r){
  const ext=!!r.url;
  return '<a class="card" href="'+esc(href(r))+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'
   +'<div class="note-head"><span>'+esc(r.topic||'General')+'</span><span>'+esc(fmt(r.date))+'</span></div>'
   +'<h3>'+esc(r.title)+'</h3><p class="desc">'+esc(r.summary)+'</p>'
   +'<div class="meta">'+(r.status?'<span>'+esc(r.status)+'</span>':'')+(r.tags||[]).map(t=>'<span>#'+esc(t)+'</span>').join('')+'</div>'
   +'<div class="go">'+(ext?'Open source ↗':'Read note →')+'</div></a>';
}
