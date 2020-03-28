var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var time_div = document.querySelector(".time");
var inputs = document.querySelector(".inputs");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var totalminutesDisplay = document.querySelector("#total_minutes");
var totalsecondsDisplay = document.querySelector("#total_seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
var add_todo_list_item = document.querySelector(".add_button");
var todo_input = document.querySelector(".todo_input");
var reset_button_e = document.querySelector(".reset_button");
var sessions_e = document.querySelector("#sessions");
var total_time_e = document.querySelector("#total_time");
var todo_list_div = document.querySelector(".todo_list_div")
var delete_button_e = document.querySelector(".delete_button")
var audio = new Audio('./audio/Cherry.mp3');

var time_stamp = Date.now();
var date = new Date(time_stamp * 1000);
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


var totalSeconds = 0;
var secondsElapsed = 0;
var secondsElapsedTotal = 0;
var status = "Working";
var interval;

getTimePreferences();

function getFormattedMinutes() {
  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

function getFormattedTotalMinutes() {
  // var secondsLeft = totalSeconds + secondsElapsed;
  var minutesLeftTotal = Math.floor(secondsElapsedTotal / 60);

  var formattedMinutes;

  if (minutesLeftTotal < 10) {
    formattedMinutes = "0" + minutesLeftTotal;
  } else {
    formattedMinutes = minutesLeftTotal;
  }

  return formattedMinutes;
}

function getFormattedTotalSeconds() {
  var secondsLeftTotal = (totalSeconds + secondsElapsedTotal) % 60;

  var formattedSeconds;

  if (formattedSeconds = secondsLeftTotal < 10) {

    formattedSeconds = "0" + secondsLeftTotal;
  } else {

    formattedSeconds = secondsLeftTotal;
  }

  return formattedSeconds;
}

function setTime() {
  var minutes;

  if (status === "Working") {
    // minutes = workMinutesInput.value.trim();
    minutes = workMinutesInput.value.trim() || 52
  } else {
    minutes = restMinutesInput.value.trim() || 17
    // minutes = 17
  }

  clearInterval(interval);
  totalSeconds = minutes * 60;
}


function renderTime() {
  minutesDisplay.textContent = getFormattedMinutes()
  secondsDisplay.textContent = ": " + getFormattedSeconds();
  totalminutesDisplay.textContent = getFormattedTotalMinutes()
  if (parseInt(getFormattedTotalSeconds()) < 10) {
    totalsecondsDisplay.textContent = getFormattedTotalSeconds()
  }
  else {
    totalsecondsDisplay.textContent = getFormattedTotalSeconds()
  }



  if (secondsElapsed >= totalSeconds) {
    if (status === "Working") {
      audio.play();
      // alert("Time for a break!");
      status = "Resting";
      document.getElementById("status-toggle").checked = false;
      document.querySelector("body").setAttribute("style", "background-image: linear-gradient(0deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
      add_todo_list_item.setAttribute("style", "background-color:rgba(168, 223, 214, 1);")
      // todo_list_div.getAttribute("style", "display: none;")
    } else {
      audio.play();
      // alert("Time to get back to work!");
      status = "Working";
      document.getElementById("status-toggle").checked = true;

      document.querySelector("body").setAttribute("style", "background-image: linear-gradient(180deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
      add_todo_list_item.setAttribute("style", "background-color:rgba(173, 92, 92, 1);")
      // todo_list_div.getAttribute("style", "display: flex;")
    }
    statusSpan.textContent = status;

    // secondsElapsed = 0;
    // setTime();
    // renderTime();

    stopTimer();
  }
}

let session_num = 0

function startTimer() {
  if (status === "Working") {
    session_num++
    total_time_e
  }
  setTime();
  audio.pause();
  sessions_e.textContent = "Session: " + session_num
  interval = setInterval(function () {
    secondsElapsed++;
    secondsElapsedTotal++;
    renderTime();
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  renderTime();
  audio.pause();
}

function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

function toggleStatus(event) {
  var checked = event.target.checked;

  if (checked) {
    status = "Working";
    document.querySelector("body").setAttribute("style", "background: linear-gradient(180deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
    add_todo_list_item.setAttribute("style", "background-color:rgba(173, 92, 92, 1);")
    reset_button_e.setAttribute("style", "background-color:rgba(168, 223, 214, 1);")

  } else {
    status = "Resting";

    document.querySelector("body").setAttribute("style", "background: linear-gradient(0deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
    add_todo_list_item.setAttribute("style", "background-color:rgba(168, 223, 214, 1);")
    reset_button_e.setAttribute("style", "background-color:rgba(173, 92, 92, 1);")

  }
  statusSpan.textContent = status;
  secondsElapsed = 0;
  setTime();
  renderTime();
}

function reset_stats() {
  session_num = 0
  sessions_e.textContent = "Session: " + session_num
}

function getTimePreferences() {
  var preferences = JSON.parse(localStorage.getItem("preferences"));

  if (preferences) {
    if (preferences.workMinutes) {
      workMinutesInput.value = preferences.workMinutes;
    }

    if (preferences.restMinutes) {
      restMinutesInput.value = preferences.restMinutes;
    }
  }

  setTime();
  renderTime();
}

function setTimePreferences() {
  localStorage.setItem(
    "preferences",
    JSON.stringify({
      workMinutes: workMinutesInput.value.trim(),
      restMinutes: restMinutesInput.value.trim()
    })
  );
}

let id = 0
const add_todo = () => {
  id++
  let list_item_div = document.createElement("div");
  let list_item = document.createElement("li");
  let delete_button = document.createElement("button");
  list_item.textContent = document.querySelector(".todo_input").value
  delete_button.innerHTML = `<i data=${id} class='fas fa-minus-circle'></i>`
  list_item_div.setAttribute("class", "list_item_div")
  list_item_div.setAttribute("id", id)
  delete_button.setAttribute("style", "background-color: unset; border: 0px; font-size: 25px; color: #ad5c5c; outline: none;")
  delete_button.setAttribute("class", "zoom delete_button")
  list_item_div.append(list_item, delete_button)
  todo_list_div.prepend(list_item_div)
  document.querySelector(".todo_input").value = ""
}

const delete_todo = (e) => {
  console.log(e.target)
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const show_time_modifiers = () => {
  if (modal.getAttribute("style") === "display: none;") {
    // console.log(inputs.getAttribute("style"))
    modal.setAttribute("style", "display: block; margin-left: 71px;")
  }
  else {
    inputs.setAttribute("style", "display: none;")
  }
  console.log(inputs)
}



playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);
add_todo_list_item.addEventListener("click", add_todo);
reset_button_e.addEventListener("click", reset_stats);
// delete_button_e.addEventListener("click", delete_todo);
document.addEventListener('click', (e) => {
  const id = e.target.getAttribute('data')
  // console.log(id)
  const list_item_to_remove = document.getElementById(id)
  // console.log(list_item_to_remove)
  list_item_to_remove.remove()
  // document.removeChild(list_item_to_remove);

})
time_div.addEventListener("click", show_time_modifiers);

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});