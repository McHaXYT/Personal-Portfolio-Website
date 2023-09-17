const searchInput = document.getElementById("search");
const projectTitle = document.querySelectorAll(".project-description");
const gridLayoutBtn = document.getElementById("gridLayout");
const listLayoutBtn = document.getElementById("listLayout");
const projectSection = document.querySelector(".projects-section");
const projectContainer = document.querySelectorAll(".projects-container");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuCloseBtn = document.getElementById("MobileMenuCloseBtn");
const mobileMenuOpenBtn = document.getElementById("MobileMenuOpenBtn");
const mobileMenuLinks = document.querySelectorAll(".mobile-nav_ul--li");
const mobileMenuLinksAnchors = document.querySelectorAll(
    ".mobile-nav_ul--li a"
);
const desktopMenuLinks = document.querySelectorAll(".nav_links--ul li a");
const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const textArea = document.getElementById("textArea");
const checkbox = document.getElementById("checkbox");
const heroJobSpan = document.getElementById("typed-jobspan");
const bodySections = document.querySelectorAll(".body-section");

// Spy Scroll

window.onscroll = () => {
    bodySections.forEach((section) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");
        if (top >= offset && top < offset + height) {
            desktopMenuLinks.forEach((link) => {
                link.classList.remove("full-underline");
                document
                    .querySelector("nav a[href*=" + id + "]")
                    .classList.add("full-underline");
            });
            mobileMenuLinksAnchors.forEach((anchor) => {
                anchor.classList.remove("full-underline");
                document
                    .querySelector(".mobile-nav_ul--li a[href*=" + id + "]")
                    .classList.add("full-underline");
            });
        }
    });
};

// Theme Toggle

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

// form validation

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerHTML = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerHTML = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isVaidEmail = (email) => {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const textAreaValue = textArea.value.trim();

    if (firstNameValue === "") {
        setError(
            firstName,
            `<i class="fa-solid fa-circle-exclamation"></i> First Name is required`
        );
    } else {
        setSuccess(firstName);
    }
    if (lastNameValue === "") {
        setError(
            lastName,
            `<i class="fa-solid fa-circle-exclamation"></i> Last Name is required`
        );
    } else {
        setSuccess(lastName);
    }
    if (emailValue === "") {
        setError(
            email,
            `<i class="fa-solid fa-circle-exclamation"></i> Email is required`
        );
    } else if (!isVaidEmail(emailValue)) {
        setError(
            email,
            `<i class="fa-solid fa-circle-exclamation"></i> Provide a valid email adress`
        );
    } else {
        setSuccess(email);
    }
    if (textAreaValue === "") {
        setError(
            textArea,
            `<i class="fa-solid fa-circle-exclamation"></i> Message is required`
        );
    } else {
        setSuccess(textArea);
    }
};

// nav

mobileMenuCloseBtn.addEventListener("click", function () {
    mobileMenu.classList.remove("open-menu");
    mobileMenu.classList.add("closed-menu");
});
mobileMenuOpenBtn.addEventListener("click", function () {
    mobileMenu.classList.add("open-menu");
    mobileMenu.classList.remove("closed-menu");
});
mobileMenuLinks.forEach((mobileMenuLink) => {
    mobileMenuLink.addEventListener("click", function () {
        mobileMenu.classList.remove("open-menu");
        mobileMenu.classList.add("closed-menu");
    });
});

desktopMenuLinks.forEach((desktopMenuLink) => {
    desktopMenuLink.addEventListener("click", (e) => {
        desktopMenuLinks.forEach((link) => {
            if (link.classList.contains("full-underline")) {
                link.classList.remove("full-underline");
            }
        });
        e.target.classList.add("full-underline");
    });
});

mobileMenuLinksAnchors.forEach((mobileMenuLinkAnchor) => {
    mobileMenuLinkAnchor.addEventListener("click", (e) => {
        mobileMenuLinksAnchors.forEach((link) => {
            if (link.classList.contains("full-underline")) {
                link.classList.remove("full-underline");
            }
        });
        e.target.classList.add("full-underline");
    });
});

// search layout

gridLayoutBtn.addEventListener("click", function () {
    gridLayoutBtn.classList.add("layouticon-active");
    listLayoutBtn.classList.remove("layouticon-active");
    projectSection.classList.add("project-section-grid");
    projectContainer.forEach((e) => {
        e.classList.add("projects-container-grid");
    });
});

listLayoutBtn.addEventListener("click", function () {
    gridLayoutBtn.classList.remove("layouticon-active");
    listLayoutBtn.classList.add("layouticon-active");
    projectSection.classList.remove("project-section-grid");
    projectContainer.forEach((e) => {
        e.classList.remove("projects-container-grid");
    });
});

// search filter
searchInput.addEventListener("keyup", (e) => {
    let inputName = e.currentTarget.value.toLowerCase();
    console.log(inputName);
    for (i = 0; i < projectTitle.length; i++) {
        let a = projectTitle[i].getElementsByTagName("h1")[0];
        let textValue = a.textContent || a.innerHTML;
        if (textValue.toLowerCase().indexOf(inputName) > -1) {
            projectTitle[i].parentElement.style.display = "";
        } else {
            projectTitle[i].parentElement.style.display = "none";
        }
    }
});
