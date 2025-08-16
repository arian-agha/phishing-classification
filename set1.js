const COUNTDOWN_SECONDS = 12;
const FIXATION_DURATION_MS = 1000;


const emailData = [
    {
        from: '<b>PayPal Service</b> &ltservice@intl.paypal.co&gt',
        subject: 'Action Required: Unusual payment activity on your PayPal',
        body: `Hello,
        <br><br>
        We noticed a payment of £349.99 to "Silver V Tech" from your account. Like many of our security conscious customers, you probably want to review this.<br><br>
        If you did NOT authorize this payment, you must log in and cancel it immediately to recieve a full refund. As per your user agreement, you are responsible for reporting unauthorized charges within 24 hours.
        <br><br>
        <u>Click Here to View and Cancel Transaction</u>
        <br><br>
        This is an automated message from the PayPal Fraud Prevention unit. Thank you for being a loyal customer.
        `
    },
    {
        from: '<b>Amazon Security</b> &ltsecurity-update@amz-support.co.uk&gt',
        subject: 'Urgent Security Alert: Unauthorized Access Attempt on Your Account',
        body: `Hi,
        <br><br>
        We have detected an suspicious sign-in to your Amazon account from an unrecognized device in Russia.
        <br><br>
        To protect your account, we have temporarily suspended it. This is a standard security procedure followed by millions of our users to ensure safety.
        <br><br>
        As a valued Prime member, your security is our top priority. Please verify your identity immediately to restore access and prevent account termination. You previously agreed to these security checks in our terms of service.
        <br><br>
        <u>Click here to verify your account</u>
        <br><br>
        This link will expire in 15 minutes for security reasons.
        <br><br>
        Sincerely,
        <br>
        The Amazon Security Team`
    }
];

const emailDisplay = document.getElementById('email-display');
const fixationCross = document.getElementById('fixation-cross');
const fromHeading = document.getElementById('email-from');
const emailSubject = document.getElementById('email-subject');
const emailBody = document.getElementById('email-body-text');
const timerCountdown = document.getElementById('timer-countdown');
const progressCircle = document.getElementById('timer-progress');
const circleRadius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * circleRadius;

let currentEmail = 0;
let countdownInterval;
let timeLeft = COUNTDOWN_SECONDS;

function displayEmail() {
    let email = emailData[currentEmail];
    fromHeading.innerHTML = email.from;
    emailSubject.innerHTML = email.subject;
    emailBody.innerHTML = email.body;
}

function startTimer() {
    timeLeft = COUNTDOWN_SECONDS;
    
    emailDisplay.classList.remove('hidden');
    fixationCross.classList.add('hidden');
    
    displayEmail();
    timerCountdown.textContent = timeLeft;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = 0;

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerCountdown.textContent = timeLeft;

        const progress = timeLeft / COUNTDOWN_SECONDS;
        const offset = circumference * (1 - progress);
        progressCircle.style.strokeDashoffset = offset;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            showFixation();
        }
    }, 1000);
}

function showFixation() {
    emailDisplay.classList.add('hidden');
    if (currentEmail < emailData.length - 1) {
        fixationCross.classList.remove('hidden');
    }
    setTimeout(() => {
        currentEmail++;
        if (currentEmail < emailData.length) { // not last email in set
            startTimer();
        } else {
            fixationCross.classList.remove('hidden');
            fixationCross.innerHTML = 'Task Complete';
            // setTimeout(() => {
            //     location.href = "set1_responses.html"
            // }, 2000)
        }
    }, FIXATION_DURATION_MS);
}

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;

window.onload = () => {
    emailDisplay.classList.add('hidden');
    fixationCross.classList.remove('hidden');
    fixationCross.innerHTML = 'Starting!';
    setTimeout(() => {
        fixationCross.classList.add('hidden');
        fixationCross.innerHTML = '+';
        startTimer();
    }, 1000);
};
        