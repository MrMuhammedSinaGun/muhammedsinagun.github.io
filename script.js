document.addEventListener("DOMContentLoaded", () => {
    // Dinamik Geçiş Animasyonları
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    });

    // Form Gönderim İşlemi
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for reaching out!");
    });
});
