var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var time_div = document.querySelector(".time");
var inputs = document.querySelector(".inputs");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var totalhoursDisplay = document.querySelector(".total_hours");
var totalminutesDisplay = document.querySelector(".total_minutes");
var totalsecondsDisplay = document.querySelector(".total_seconds");
var workhoursDisplay = document.querySelector("#work_hours");
var workminutesDisplay = document.querySelector("#work_minutes");
var worksecondsDisplay = document.querySelector("#work_seconds");
var breakhoursDisplay = document.querySelector("#break_hours");
var breakminutesDisplay = document.querySelector("#break_minutes");
var breaksecondsDisplay = document.querySelector("#break_seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
var add_todo_list_item = document.querySelector(".add_button");
var todo_input = document.querySelector(".todo_input");
var reset_button_e = document.querySelector(".reset_button");
var sessions_e = document.querySelector("#sessions");
var total_time_e = document.querySelector("#total_time");
var todo_list_div = document.querySelector(".todo_list_div")
var view_stats_button_e = document.querySelector(".view_stats_button")
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
var secondsElapsedWork = 0;
var secondsElapsedBreak = 0;
var status = "Working";
var interval;

// getTimePreferences();




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

function get_formatted_hours() {
  // var secondsLeft = totalSeconds + secondsElapsed;
  var hours_left = Math.floor(secondsElapsedTotal / 60 / 60);

  var formatted_hours;

  if (hours_left < 10) {
    formatted_hours = "0" + hours_left;
  } else {
    formatted_hours = hours_left;
  }

  return formatted_hours;
}

function get_formatted_minutes() {
  // var secondsLeft = totalSeconds + secondsElapsed;
  var minutes_left = Math.floor(secondsElapsedTotal / 60);

  var formatted_minutes;

  if (minutes_left < 10) {
    formatted_minutes = "0" + minutes_left;
  } else {
    formatted_minutes = minutes_left;
  }

  return formatted_minutes;
}

function get_formatted_seconds() {
  var seconds_left = (totalSeconds + secondsElapsedTotal) % 60;

  var formatted_seconds;

  if (formatted_seconds = seconds_left < 10) {

    formatted_seconds = "0" + seconds_left;
  } else {

    formatted_seconds = seconds_left;
  }

  return formatted_seconds;
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
  minutesDisplay.textContent = " " + getFormattedMinutes()
  secondsDisplay.textContent = ": " + getFormattedSeconds();

  totalhoursDisplay.textContent = get_formatted_hours()
  totalminutesDisplay.textContent = get_formatted_minutes()
  totalsecondsDisplay.textContent = get_formatted_seconds()

  if (status === "Working") {

    workhoursDisplay.textContent = get_formatted_hours()
    workminutesDisplay.textContent = get_formatted_minutes()
    worksecondsDisplay.textContent = get_formatted_seconds()
  }
  else if (status === "Resting") {
    breakhoursDisplay.textContent = get_formatted_hours()
    breakminutesDisplay.textContent = get_formatted_minutes()
    breaksecondsDisplay.textContent = get_formatted_seconds()
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
    // total_time_e
  }
  setTime();
  audio.pause();
  sessions_e.textContent = "Session: " + session_num
  interval = setInterval(function () {
    secondsElapsed++;
    secondsElapsedTotal++;
    if (status === "Working") {
      secondsElapsedWork++;
    }
    else if (status === "Resting") {
      secondsElapsedBreak++;
    }


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
  secondsElapsed = 0;
  secondsElapsedTotal = 0;
  secondsElapsedWork = 0;
  secondsElapsedBreak = 0;
  session_num = 0
  totalSeconds = 0
  secondsLeftTotal = "00"
  sessions_e.textContent = "Session: " + session_num
  totalminutesDisplay.textContent = secondsLeftTotal
  totalsecondsDisplay.textContent = secondsLeftTotal
  totalhoursDisplay.textContent = secondsLeftTotal
  totalminutesDisplay.textContent = secondsLeftTotal
  totalsecondsDisplay.textContent = secondsLeftTotal
  workhoursDisplay.textContent = secondsLeftTotal
  workminutesDisplay.textContent = secondsLeftTotal
  worksecondsDisplay.textContent = secondsLeftTotal
  breakhoursDisplay.textContent = secondsLeftTotal
  breakminutesDisplay.textContent = secondsLeftTotal
  breaksecondsDisplay.textContent = secondsLeftTotal
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

var time_modifier_modal = document.querySelector(".time_modifier_modal");


const show_time_modifiers = () => {
  if (time_modifier_modal.getAttribute("style") === "display: none;") {
    time_modifier_modal.setAttribute("style", "display: block; margin-left: 71px;")
  }
  else {
    time_modifier_modal.setAttribute("style", "display: none;")
  }
}



var stats_modal = document.getElementById("stats_modal");

const show_stats = () => {
  if (stats_modal.getAttribute("style") === "display: none;") {
    stats_modal.setAttribute("style", "display: block;")
  }
  else {
    stats_modal.setAttribute("style", "display: none;")
  }
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
view_stats_button_e.addEventListener("click", show_stats);

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});









































