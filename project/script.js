document.addEventListener("DOMContentLoaded", () => {
    // Dinamik Animasyonlar
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("visible");
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(section);
    });

    // Form İşlemi
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const responseMessage = document.getElementById("response-message");
        responseMessage.textContent = "Thank you for your message!";
        responseMessage.style.color = "limegreen";
    });
});
