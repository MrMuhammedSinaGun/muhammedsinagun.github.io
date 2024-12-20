// GSAP ve ScrollTrigger ile Navbar ve Kaydırma Animasyonu
gsap.registerPlugin(ScrollTrigger);

// Navbar'ın Animasyonu
const showAnim = gsap
    .from("nav", {
        yPercent: -100,
        paused: true,
        duration: 0.2,
    })
    .progress(1);

ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
});

// Banner ve Bölümler için GSAP Scroll Animasyonu
gsap.utils.toArray("section").forEach((section) => {
    const w = section.querySelector(".image");
    if (w) {
        const [x, xEnd] = [w.scrollWidth * -1, 0];
        gsap.fromTo(
            w,
            { x },
            {
                x: xEnd,
                scrollTrigger: {
                    trigger: section,
                    scrub: 1,
                },
            }
        );
    }
});
