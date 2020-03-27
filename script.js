var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var time_div = document.querySelector(".time");
var inputs = document.querySelector(".inputs");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
var add_activity_list_item = document.querySelector(".add_button");
var activity_input = document.querySelector(".activity_input");
var activity_list_div = document.querySelector(".activity_list_div")
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
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();

  if (secondsElapsed >= totalSeconds) {
    if (status === "Working") {
      audio.play();
      // alert("Time for a break!");
      status = "Resting";
      document.getElementById("status-toggle").checked = false;
      document.querySelector("body").setAttribute("style", "background-image: linear-gradient(0deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
    } else {
      audio.play();
      // alert("Time to get back to work!");
      status = "Working";
      document.getElementById("status-toggle").checked = true;

      document.querySelector("body").setAttribute("style", "background-image: linear-gradient(180deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
    }
    statusSpan.textContent = status;

    // secondsElapsed = 0;
    // setTime();
    // renderTime();

    stopTimer();
  }
}

function startTimer() {
  setTime();
  audio.pause();
  interval = setInterval(function () {
    secondsElapsed++;
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
    // for (let i = 180; i >= 0; i++) {
    //   document.querySelector("body").setAttribute("style", `background: linear-gradient(${i}deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)`)
    // }

  } else {
    status = "Resting";

    document.querySelector("body").setAttribute("style", "background: linear-gradient(0deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
    // for (let i = 0; i < 180; i++) {
    //   document.querySelector("body").setAttribute("style", `background: linear-gradient(${i}deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)`)
    // }
  }

  statusSpan.textContent = status;

  secondsElapsed = 0;
  setTime();
  renderTime();
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
const add_activity = () => {
  id++
  // console.log(document.querySelector(".activity_input").value)
  let list_item_div = document.createElement("div");
  let list_item = document.createElement("li");
  let delete_button = document.createElement("button");
  list_item.textContent = document.querySelector(".activity_input").value
  delete_button.innerHTML = `<i data=${id} class='fas fa-minus-circle'></i>`
  list_item_div.setAttribute("class", "list_item_div")
  list_item_div.setAttribute("id", id)

  delete_button.setAttribute("style", "background-color: unset; border: 0px; font-size: 25px; color: #ad5c5c; outline: none;")
  delete_button.setAttribute("class", "zoom delete_button")
  list_item_div.append(list_item, delete_button)
  activity_list_div.prepend(list_item_div)
  document.querySelector(".activity_input").value = ""
}

const delete_activity = (e) => {
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
    modal.setAttribute("style", "display: block; margin-left: 71px; width: 41%;")
  }
  else {
    inputs.setAttribute("style", "display: none;")
  }
  console.log(inputs)
}



// // When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }



playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);
add_activity_list_item.addEventListener("click", add_activity);
// delete_button_e.addEventListener("click", delete_activity);
document.addEventListener('click', (e) => {
  const id = e.target.getAttribute('data')
  // console.log(id)
  const list_item_to_remove = document.getElementById(id)
  // console.log(list_item_to_remove)
  list_item_to_remove.remove()
  // document.removeChild(list_item_to_remove);

})
time_div.addEventListener("click", show_time_modifiers);