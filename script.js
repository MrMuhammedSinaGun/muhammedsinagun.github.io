document.addEventListener("DOMContentLoaded", () => {
    // Dinamik Scroll Animasyonu
    const sections = document.querySelectorAll("section");
    const navbarLinks = document.querySelectorAll(".navbar ul li a");

    const options = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            if (entry.isIntersecting) {
                document
                    .querySelector(`.navbar ul li a[href="#${id}"]`)
                    .classList.add("active");
            } else {
                document
                    .querySelector(`.navbar ul li a[href="#${id}"]`)
                    .classList.remove("active");
            }
        });
    }, options);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Navbar Geçişi
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Form İşlemleri
    const form = document.querySelector("#contact-form");
    const responseMessage = document.querySelector("#response-message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        // Basit Doğrulama
        if (name && email && message) {
            responseMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
            responseMessage.style.color = "green";
        } else {
            responseMessage.textContent = "Please fill out all fields.";
            responseMessage.style.color = "red";
        }

        form.reset();
    });

    // Dinamik Buton Geçişleri
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "#fff";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.backgroundColor = "#ffd700";
            btn.style.color = "#333";
        });
    });

    // Sayfaya Geçiş Butonu (Back to Top)
    const backToTop = document.createElement("button");
    backToTop.textContent = "↑";
    backToTop.classList.add("back-to-top");
    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });
});
