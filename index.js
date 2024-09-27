// Elements selection
const changeMode = document.getElementById("changemode");
const modeIcon = document.getElementById("modeicon");
const container = document.querySelector(".container");
const about = document.querySelector(".about");
const navcontainer = document.querySelector(".nav");
const separator = document.querySelector(".separator");
const profile = document.querySelector(".portfolio-container");
const contactcontainer = document.querySelector(".wrap-contact");
const footer = document.querySelector("footer");
const hero = document.querySelector(".hero");
const elementsToToggle = [
  container,
  about,
  navcontainer,
  separator,
  profile,
  contactcontainer,
  hero,
  footer,
];
const toggle = document.getElementById("toggle");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");

const textElement = document.getElementById("developer-role");
const texts = [
  "Full Stack Developer (MERN Stack)",
  "CS Graduate & Aspiring Master's Candidate in MCA",
];

// Function to activate dark mode
function activateDarkMode() {
  elementsToToggle.forEach((element) => element.classList.add("dark"));
  toggle.checked = true; // Ensure the toggle is checked for dark mode
  moon.style.opacity = "1";
  sun.style.opacity = "0";
  modeIcon.classList.replace("fa-moon", "fa-sun");
}

// Function to deactivate dark mode
function deactivateDarkMode() {
  elementsToToggle.forEach((element) => element.classList.remove("dark"));
  toggle.checked = false; // Ensure the toggle is unchecked for light mode
  moon.style.opacity = "0";
  sun.style.opacity = "1";
  modeIcon.classList.replace("fa-sun", "fa-moon");
}

// Event listener for the toggle switch
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    activateDarkMode(); // Save preference to localStorage
  } else {
    deactivateDarkMode(); // Remove preference from localStorage
  }
});

// Text change logic
let index = 0;
function changeText() {
  textElement.classList.add("hidden");
  setTimeout(() => {
    index = (index + 1) % texts.length;
    textElement.textContent = texts[index];
    textElement.classList.remove("hidden");
  }, 1500);
}
setInterval(changeText, 4000);

// Unified Intersection Observer logic
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = [
    {
      element: document.querySelector(".about-image > img"),
      classToAdd: "show",
    },
    { element: document.querySelector(".about-text"), classToAdd: "show" },
    { element: document.querySelector(".tech-stack"), classToAdd: "show" },
    {
      element: document.querySelector(".imagepart-contact > img"),
      classToAdd: "show",
    },
  ];

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  });

  elementsToObserve.forEach(({ element }) => {
    if (element) observer.observe(element);
  });
});

// Form validation and submission
const submit = document.querySelector(".contact-btn");
submit.addEventListener("click", ValidateUser);

// Function to validate form values
function validateFormValues(mailId, name, messageValue) {
  // Get the error elements
  const mailError = document.getElementById("emailError");
  const nameError = document.getElementById("nameError");
  const messageError = document.getElementById("messageError");

  // Clear previous error messages
  mailError.textContent = "";
  nameError.textContent = "";
  messageError.textContent = "";

  let isValid = true;

  // Validate the name field
  if (name.trim() === "") {
    nameError.textContent = "Please enter your name";
    isValid = false;
  }

  // Validate the email field
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(mailId.trim())) {
    mailError.textContent = "Please enter a valid email address";
    isValid = false;
  }

  // Validate the message field
  if (messageValue.trim() === "") {
    messageError.textContent = "Please enter your message";
    isValid = false;
  }

  return isValid;
}

// Function triggered on form submission
function ValidateUser(event) {
  event.preventDefault();
  const mailId = document.getElementById("email-contact").value;
  const name = document.getElementById("name-contact").value;
  const messageValue = document.getElementById("message-contact").value;

  const isFormValid = validateFormValues(mailId, name, messageValue);
  if (isFormValid) {
    alert("Thanks for submitting the form");
    document.getElementById("contact-form").reset();
  }
}
