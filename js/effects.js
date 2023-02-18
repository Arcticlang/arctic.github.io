function random_string(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function glitch_effect(element) {
    const GLITCH_SPEED = (element.getAttribute("data-glitch-speed")) ? parseInt(element.getAttribute("data-glitch-speed")) : 30
    if (element.getAttribute("data-switching") === "true") return;
    element.setAttribute("data-switching", "true")
    let text = element.innerText;
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.innerText = text.substring(0, i+1) + random_string(text.length-i-1)

            if (i == text.length-1) element.setAttribute("data-switching", "false");
        }, i*GLITCH_SPEED)
    }
}

$(".glitch-effect").each(function () {
    $(this).mouseover(function() {
        glitch_effect(this);
    });
});

$(".glitch-effect-start").each(function () {
    glitch_effect(this);
});

const children_intersection_observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        $(entry.target).children().each(function() {
            this.classList.toggle("show", entry.isIntersecting)
        })
    })
}, {threshold: 0.5})

$(".children-intersection").each(function () {
    children_intersection_observer.observe(this);
});