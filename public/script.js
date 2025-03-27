let timer = null;
let startTime = null;
function toggleClock() {
    const button = document.getElementById('toggleButton');
    const clock = document.getElementById('clock');
    const startTimeText = document.getElementById('startTime');
    const entriesContainer = document.getElementById('entries');
    if (button.innerText === 'Start') {
        button.innerText = 'Stop';
        button.style.backgroundColor = '#FF0000';
        startTime = new Date();
        startTimeText.innerText = `Start Time: ${startTime.toLocaleTimeString()}`;
        timer = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = new Date(currentTime - startTime);
            clock.innerText = elapsedTime.toISOString().substr(11, 8);
        }, 1000);
    } else {
        clearInterval(timer);
        button.innerText = 'Start';
        button.style.backgroundColor = '#00FF00';
        const stopTime = new Date();
        const elapsedTime = new Date(stopTime - startTime);
        const entry = document.createElement('div');
        entry.classList.add('entry');
        entry.innerHTML = `
      Client: John Doe, Inc.<br>
      Start Time: ${startTime.toLocaleTimeString()}<br>
      Stop Time: ${stopTime.toLocaleTimeString()}<br>
      Time Elapsed: ${elapsedTime.toISOString().substr(11, 8)}
    `;
        entriesContainer.prepend(entry);
        startTimeText.innerText = 'Start Time: -';
        clock.innerText = '00:00:00';
    }
}
document.getElementById('toggleButton').addEventListener('click', toggleClock);