let timerId = null;

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const targetInput = document.getElementById("targetTime");

    startButton.addEventListener("click", function () {
        const targetValue = targetInput.value;
        if (!targetValue) {
            alert("Please select a future date and time.");
            return;
        }

        const targetDate = new Date(targetValue);
        if (targetDate <= new Date()) {
            alert("Please choose a time in the future.");
            return;
        }

        if (timerId) {
            clearInterval(timerId);
        }

        timerId = setInterval(function () {
            updateCountdown(targetDate);
        }, 1000);

        updateCountdown(targetDate);
    });
});

function updateCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timerId);
        document.getElementById("message").textContent = "Time is up!";
        setDisplay(0, 0, 0, 0);
        return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setDisplay(days, hours, minutes, seconds);
}

function setDisplay(days, hours, minutes, seconds) {
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}
