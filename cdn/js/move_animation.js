const style_moveani = document.createElement("style");
style_moveani.textContent = `
body {
    background: #000;
}
.page-transition-base {
    opacity: 0;
    transform: scale(1.05);
}
.page-transition-animate {
    transition: opacity .55s ease, transform .55s ease;
}
.page-transition-enter {
    opacity: 1 !important;
    transform: scale(1) !important;
}
.page-transition-exit {
    opacity: 0 !important;
    transform: scale(1.05) !important;
}
`;
document.head.appendChild(style_moveani);

function runEnterAnimation() {
    const bodyElement = document.body;
    if (!bodyElement) return;

    bodyElement.classList.remove("page-transition-exit");
    bodyElement.classList.add("page-transition-base");

    document.documentElement.style.visibility = "visible";

    requestAnimationFrame(() => {
        bodyElement.classList.add("page-transition-animate", "page-transition-enter");
        
        setTimeout(() => {
            bodyElement.classList.remove("page-transition-base", "page-transition-enter");
        }, 600);
    });
}

document.documentElement.style.visibility = "hidden";

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runEnterAnimation);
} else {
    runEnterAnimation();
}

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        runEnterAnimation();
    }
});

document.addEventListener("click", e => {
    const anchorElement = e.target.closest("a");
    if (!anchorElement) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const href = anchorElement.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:") || anchorElement.target === "_blank") return;

    e.preventDefault(); 
    
    document.body.classList.add("page-transition-exit");
    
    setTimeout(() => {
        location.href = href;
    }, 550);
});
