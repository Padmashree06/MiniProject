
//  Firebase Config


//  Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//  Sign-Up Handler
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form reload

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const warning = document.getElementById("password-warning");

  //  Validate inputs
  if (!name || !email || !password || !confirmPassword) {
    warning.textContent = "Please fill in all fields.";
    return;
  }

  //  Password strength check
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPassword.test(password)) {
    warning.textContent = "Password too weak. Must be at least 8 characters with upper, lower, digit, and special char.";
    return;
  }

  //  Confirm password match
  if (password !== confirmPassword) {
    warning.textContent = "Passwords do not match. Please try again.";
    return;
  }

  
  warning.textContent = "";

  // Sign up with Firebase
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert(`Welcome ${name}! Get ready to dive into learning databases!`);
      console.log("Signed Up:", userCredential.user);
      window.location.href = "mainpage.html";
    })
    .catch((error) => {
      warning.textContent = error.message;
      console.error("Sign-up error:", error);
    });
});
