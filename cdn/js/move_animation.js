const style=document.createElement("style");
style.textContent=`
body{background:#000;}
.page-transition-base{opacity:0;transform:scale(1.05);}
.page-transition-animate{transition:opacity .55s ease,transform .55s ease;}
.page-transition-enter{opacity:1!important;transform:scale(1)!important;}
.page-transition-exit{opacity:0!important;transform:scale(1.05)!important;}
`;
document.head.appendChild(style);

document.documentElement.style.visibility="hidden";

document.addEventListener("DOMContentLoaded",()=>{
    const b=document.body;
    b.classList.add("page-transition-base");
    document.documentElement.style.visibility="visible";
    requestAnimationFrame(()=>{
        b.classList.add("page-transition-animate","page-transition-enter");
        setTimeout(()=>{
            b.classList.remove("page-transition-base","page-transition-enter");
        },600);
    });
});

document.addEventListener("click",e=>{
    const a=e.target.closest("a");
    if(!a) return;
    const href=a.getAttribute("href");
    if(!href||href.startsWith("#")||href.startsWith("javascript:")||a.target==="_blank") return;

    e.preventDefault();
    document.body.classList.add("page-transition-exit");
    setTimeout(()=>{ location.href=href; },550);
});
