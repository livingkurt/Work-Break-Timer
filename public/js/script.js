// Elements

// Containers
const time_div = document.querySelector(".time");
const todo_list_div = document.querySelector(".todo_list_div")

// Time Display
const minutes_display = document.querySelector("#minutes");
const seconds_display = document.querySelector("#seconds");
const total_hours_display = document.querySelector(".total_hours");
const total_minutes_display = document.querySelector(".total_minutes");
const total_seconds_display = document.querySelector(".total_seconds");
const work_hours_display = document.querySelector("#work_hours");
const work_minutes_display = document.querySelector("#work_minutes");
const work_seconds_display = document.querySelector("#work_seconds");
const break_hours_display = document.querySelector("#break_hours");
const break_minutes_display = document.querySelector("#break_minutes");
const break_seconds_display = document.querySelector("#break_seconds");
const work_minutes_input = document.querySelector("#work-minutes");
const rest_minutes_input = document.querySelector("#rest-minutes");

// Inputs
const inputs = document.querySelector(".inputs");
const todo_input = document.querySelector(".todo_input");

// Modals
const stats_modal = document.getElementById("stats_modal");
const time_modifier_modal = document.querySelector(".time_modifier_modal");

// Buttons
const play_button = document.querySelector("#play");
const pause_button = document.querySelector("#pause");
const stop_button = document.querySelector("#stop");
const add_todo_list_item = document.querySelector(".add_button");
const reset_button_e = document.querySelector(".reset_button");
const view_stats_button_e = document.querySelector(".view_stats_button")
const delete_button_e = document.querySelector(".delete_button")

// Checkbox
const status_toggle = document.querySelector("#status-toggle");

// Stats
const sessions_e = document.querySelector("#sessions");
const total_time_e = document.querySelector("#total_time");
const status_span = document.querySelector("#status");

// Audo
const audio = new Audio('./public/audio/Cherry.mp3');

// Initializing Variables
let total_seconds = 0;
let seconds_elapsed = 0;
let seconds_elapsed_total = 0;
let seconds_elapsed_work = 0;
let seconds_elapsed_break = 0;
let list_item_id = 0
let session_num = 0
let status = "Working";
let interval;


const getFormattedMinutes = () => {
  let seconds_left = (total_seconds - seconds_elapsed) % 3600;
  let minutes_left = Math.floor(seconds_left / 60);
  return get_formatted_time(minutes_left);
}

const getFormattedSeconds = () => {
  let seconds_left = (total_seconds - seconds_elapsed) % 60;
  return get_formatted_time(seconds_left);
}

const get_formatted_hours = (time_elapsed) => {
  let hours_left = Math.floor(time_elapsed / 60 / 60) % 216000;
  if (hours_left > 59) {
    hours_left = 0
  }
  return get_formatted_time(hours_left);
}

const get_formatted_minutes = (time_elapsed) => {
  // time_elapsed = 3540
  let minutes_left = Math.floor(time_elapsed / 60) % 3600;
  if (minutes_left > 59) {
    minutes_left = (60 - minutes_left)
    minutes_left = Math.abs(minutes_left)
  }
  return get_formatted_time(minutes_left);
}

const get_formatted_seconds = (time_elapsed) => {
  let seconds_left = (total_seconds + time_elapsed) % 60;
  return get_formatted_time(seconds_left);
}

const get_formatted_time = (time_left) => {
  let formatted_time;
  if (formatted_time = time_left < 10) {
    formatted_time = "0" + time_left;
  } else {
    formatted_time = time_left;
  }
  return formatted_time;
}

const setTime = () => {
  let minutes;

  if (status === "Working") {
    minutes = work_minutes_input.value.trim()
    // work_minutes_display.textContent = minutes
  } else {
    minutes = rest_minutes_input.value.trim()
    // break_minutes_display.textContent = minutes
  }

  clearInterval(interval);
  total_seconds = minutes * 60;
}


const renderTime = () => {
  minutes_display.textContent = " " + getFormattedMinutes()
  seconds_display.textContent = ":" + getFormattedSeconds();
  total_hours_display.textContent = get_formatted_hours(seconds_elapsed_total)
  total_minutes_display.textContent = get_formatted_minutes(seconds_elapsed_total)
  total_seconds_display.textContent = get_formatted_seconds(seconds_elapsed_total)
  if (status === "Working") {
    work_hours_display.textContent = get_formatted_hours(seconds_elapsed_work)
    work_minutes_display.textContent = get_formatted_minutes(seconds_elapsed_work)
    work_seconds_display.textContent = get_formatted_seconds(seconds_elapsed_work)
  }
  else if (status === "Resting") {
    break_hours_display.textContent = get_formatted_hours(seconds_elapsed_break)
    break_minutes_display.textContent = get_formatted_minutes(seconds_elapsed_break)
    break_seconds_display.textContent = get_formatted_seconds(seconds_elapsed_break)
  }
  if (seconds_elapsed >= total_seconds) {
    if (status === "Working") {
      audio.play();
      render_styles_resting()
    }
    else {
      audio.play();
      render_styles_working()
    }
    status_span.textContent = status;
    stopTimer();
  }
}

const maroon = "background-color:rgba(173, 92, 92, 1);"
const turquoise = "background-color:rgba(168, 223, 214, 1);"


const render_styles_resting = () => {
  status = "Resting";
  document.querySelector("body").setAttribute("style", "background-image: linear-gradient(0deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
  add_todo_list_item.setAttribute("style", turquoise)
  reset_button_e.setAttribute("style", maroon)
  view_stats_button_e.setAttribute("style", maroon)
}
const render_styles_working = () => {
  status = "Working";
  document.querySelector("body").setAttribute("style", "background-image: linear-gradient(180deg, rgba(173, 92, 92, 1) 9%, rgba(168, 223, 214, 1) 78%, rgba(168, 223, 214, 1) 78%)")
  add_todo_list_item.setAttribute("style", maroon)
  reset_button_e.setAttribute("style", turquoise)
  view_stats_button_e.setAttribute("style", turquoise)
}

const startTimer = () => {
  if (status === "Working") {
    session_num++
  }
  setTime();
  audio.pause();
  sessions_e.textContent = "Session: " + session_num
  interval = setInterval(() => {
    seconds_elapsed++;
    seconds_elapsed_total++;
    if (status === "Working") {
      seconds_elapsed_work++;
    }
    else if (status === "Resting") {
      seconds_elapsed_break++;
    }
    renderTime();
  }, 1000);
}

const pauseTimer = () => {
  clearInterval(interval);
  renderTime();
  audio.pause();
}

const stopTimer = () => {
  seconds_elapsed = 0;
  setTime();
  renderTime();
}

const toggleStatus = (event) => {
  let checked = event.target.checked;
  if (checked) {
    render_styles_working()

  } else {
    render_styles_resting()

  }
  status_span.textContent = status;
  seconds_elapsed = 0;
  setTime();
  renderTime();
}

const reset_stats = () => {
  seconds_elapsed = 0;
  seconds_elapsed_total = 0;
  seconds_elapsed_work = 0;
  seconds_elapsed_break = 0;
  session_num = 0
  total_seconds = 0
  seconds_left = "00"
  sessions_e.textContent = "Session: " + session_num
  total_minutes_display.textContent = seconds_left
  total_seconds_display.textContent = seconds_left
  total_hours_display.textContent = seconds_left
  total_minutes_display.textContent = seconds_left
  total_seconds_display.textContent = seconds_left
  work_hours_display.textContent = seconds_left
  work_minutes_display.textContent = seconds_left
  work_seconds_display.textContent = seconds_left
  break_hours_display.textContent = seconds_left
  break_minutes_display.textContent = seconds_left
  break_seconds_display.textContent = seconds_left
}

const add_todo = () => {
  list_item_id++
  const list_item_div = document.createElement("div");
  const list_item = document.createElement("li");
  const delete_button = document.createElement("button");
  list_item.textContent = document.querySelector(".todo_input").value
  delete_button.innerHTML = `<i data=${list_item_id} class='fas fa-minus-circle'></i>`
  list_item_div.setAttribute("class", "list_item_div")
  list_item_div.setAttribute("id", list_item_id)
  delete_button.setAttribute("style", "background-color: unset; border: 0px; font-size: 25px; color: #ad5c5c; outline: none;")
  delete_button.setAttribute("class", "zoom delete_button")
  list_item_div.append(list_item, delete_button)
  todo_list_div.prepend(list_item_div)
  document.querySelector(".todo_input").value = ""
}

// Show Hide Modals
const show_time_modifiers = () => {
  if (time_modifier_modal.getAttribute("style") === "display: none;") {
    time_modifier_modal.setAttribute("style", "display: block; margin-left: 71px;")
  }
  else {
    time_modifier_modal.setAttribute("style", "display: none;")
  }
}

const show_stats = () => {
  if (stats_modal.getAttribute("style") === "display: none;") {
    stats_modal.setAttribute("style", "display: block;")
  }
  else {
    stats_modal.setAttribute("style", "display: none;")
  }
}

const update_minutes_display = () => {
  if (status === "Working") {
    minutes = work_minutes_input.value.trim()
  } else {
    minutes = rest_minutes_input.value.trim()
  }
  minutes_display.textContent = minutes
  minutes_display

}

// Event Listeners
play_button.addEventListener("click", startTimer);
pause_button.addEventListener("click", pauseTimer);
stop_button.addEventListener("click", stopTimer);
status_toggle.addEventListener("change", toggleStatus);
add_todo_list_item.addEventListener("click", add_todo);
reset_button_e.addEventListener("click", reset_stats);
document.addEventListener('click', (e) => {
  const id = e.target.getAttribute('data')
  const list_item_to_remove = document.getElementById(id)
  if (!list_item_to_remove === null) {
    list_item_to_remove.remove()
  }


})
time_div.addEventListener("click", show_time_modifiers);
view_stats_button_e.addEventListener("click", show_stats);

work_minutes_input.addEventListener("click", update_minutes_display);
rest_minutes_input.addEventListener("click", update_minutes_display);

// View Port Settings for Moble I think
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});









































