document.addEventListener("DOMContentLoaded", function () {
    let themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // If button does not exist, create and append it to the page
    if (!themeToggle) {
        themeToggle = document.createElement("button");
        themeToggle.id = "theme-toggle";
        themeToggle.innerText = "Toggle Dark Mode";
        document.body.appendChild(themeToggle);
    }

    // Ensure default light mode unless dark mode was enabled before
    if (!localStorage.getItem("darkMode")) {
        localStorage.setItem("darkMode", "disabled");
    }

    function applyTheme() {
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }
    }

    applyTheme(); // Apply dark mode setting on page load

    // Toggle functionality
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Apply button styles
    themeToggle.style.position = "fixed";
    themeToggle.style.bottom = "20px";
    themeToggle.style.right = "20px";
    themeToggle.style.padding = "10px 15px";
    themeToggle.style.border = "none";
    themeToggle.style.borderRadius = "8px";
    themeToggle.style.cursor = "pointer";
    themeToggle.style.fontSize = "16px";
    themeToggle.style.transition = "all 0.3s ease-in-out";
    themeToggle.style.background = "#007bff";
    themeToggle.style.color = "white";

    themeToggle.addEventListener("mouseover", function () {
        themeToggle.style.transform = "scale(1.1)";
    });

    themeToggle.addEventListener("mouseout", function () {
        themeToggle.style.transform = "scale(1)";
    });
});
