// Elements selection
const changeMode = document.getElementById("changemode");
const modeIcon = document.getElementById("modeicon");
const container = document.querySelector(".container");
const about = document.querySelector(".about");
const navcontainer = document.querySelector(".nav");
const separator = document.querySelector(".separator");
const profile = document.querySelector(".portfolio-container");
const contactcontainer = document.querySelector(".wrap-contact");
const hero = document.querySelector(".hero");
const elementsToToggle = [
  container,
  about,
  navcontainer,
  separator,
  profile,
  contactcontainer,
  hero,
];
const textElement = document.getElementById("developer-role");
const texts = [
  "Full Stack Developer (MERN Stack)",
  "CS Graduate & Aspiring Master's Candidate in MCA",
];

// Load the mode from localStorage on page load
const savedMode = localStorage.getItem("darkMode");
if (savedMode === "enabled") {
  activateDarkMode();
}

// Toggle dark mode and save the state
changeMode.addEventListener("click", () => {
  elementsToToggle.forEach((element) => element.classList.toggle("dark"));

  if (container.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
    modeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.removeItem("darkMode");
    modeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

function activateDarkMode() {
  elementsToToggle.forEach((element) => element.classList.add("dark"));
  modeIcon.classList.replace("fa-moon", "fa-sun");
}

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

// Select the submit button
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
  // Prevent the form from submitting
  event.preventDefault();

  // Get input values
  const mailId = document.getElementById("email-contact").value;
  const name = document.getElementById("name-contact").value;
  const messageValue = document.getElementById("message-contact").value;

  // Validate form fields
  const isFormValid = validateFormValues(mailId, name, messageValue);

  // Perform further actions only if the form is valid
  if (isFormValid) {
    alert("Thanks for submitting the form");
    location.reload();
  }
}
