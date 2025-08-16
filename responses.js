import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let emailCount = 0;

function setEmailSubject(n) {
  const emailSubject = document.getElementById("email-subject");
  if (n == 0) {
    emailSubject.textContent = "Hello1";
  } else {
    emailSubject.textContent = "Hello2";
  }
}

function getCookie(cookieName) {
    cookieName = cookieName + "=";
    let cookies = decodeURIComponent(document.cookie);
    let cookieArray = cookies.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
}

function sendBackToMenu() {
  document.querySelector(".main-container").innerHTML = `<h1>You have classified Set 1 emails. <br>You will now be returned to the Main Menu.`;
  setTimeout(() => {
    location.href = "experiment.html";
  }, 5000);
}

function processDbAccess() {
  const firebaseConfig = {
      apiKey: "AIzaSyB_MbHkfXe8u7_fbyCbZRxsFSYQCNSgxxQ",
      authDomain: "phishing-classification-3946c.firebaseapp.com",
      projectId: "phishing-classification-3946c",
      storageBucket: "phishing-classification-3946c.firebasestorage.app",
      messagingSenderId: "821118450530",
      appId: "1:821118450530:web:e7c09e0c9ea1abd4618a3b",
      measurementId: "G-VV5K56VYGS"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const buttons = document.querySelectorAll(".response-button");
  const emailSubjectEl = document.getElementById("email-subject");

  buttons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      if (emailCount > 2) { // Don't submit more than two responses ..
        console.log("Nope");
        document.cookie = "set1_completed=true;path=/;expires=Thu, 11 Sep 2025 12:00:00 UTC";
        sendBackToMenu();
      }
      const response = e.target.value.trim();
      const subject = emailSubjectEl.textContent.trim();
      try {
          await addDoc(collection(db, "responses"), {
            subject,
            response,
            createdAt: serverTimestamp()
          });
          setEmailSubject(emailCount++);
        } catch (err) {
          console.error(err);
        }
    });
  });
}

window.onload = () => {
  if (getCookie("set1_completed") == "true") {
    sendBackToMenu();
  }

  setEmailSubject(emailCount);
  emailCount++;
  processDbAccess();
};