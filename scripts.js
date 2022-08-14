const colors = {
  white: "#ffffff",
  black: "#000000",
  dark: "#252527",
};

let searchHere = document.getElementById("searchHere");
const modeSwitch = document.getElementById("modeSwitch");
modeSwitch.addEventListener("click", toggleMode);
function toggleMode() {
  const navbar = document.getElementById("navbar");
  const modeText = document.getElementById("modeText");
  let noteCard = document.querySelectorAll(".noteCard");
  if (modeText.textContent === "Dark Mode") {
    navbar.classList.remove("bg-light");
    navbar.classList.add("bg-dark");
    navbar.classList.add("navbar-dark");
    modeText.style.color = "white";
    modeText.textContent = "Light Mode";
    searchHere.style.backgroundColor = "#212529";
    searchHere.style.borderColor = colors.white;
    searchHere.style.color = colors.white;
    document.body.style.backgroundColor = colors.dark;
    document.body.style.color = colors.white;
    document.querySelector("#noteTitle").style.backgroundColor = colors.dark;
    document.querySelector("#noteTitle").style.color = colors.white;
    document.querySelector("textarea").style.backgroundColor = colors.dark;
    document.querySelector("textarea").style.color = colors.white;
    document.querySelector(".card-body").style.backgroundColor = colors.dark;
    if (noteCard != undefined) {
      for (let i = 0; i < noteCard.length; i++) {
        noteCard[i].style.backgroundColor = colors.dark;
        noteCard[i].style.borderColor = colors.white;
      }
    }
  } else if (modeText.textContent === "Light Mode") {
    navbar.classList.remove("bg-dark");
    navbar.classList.remove("navbar-dark");
    navbar.classList.add("bg-light");
    modeText.style.color = "black";
    modeText.textContent = "Dark Mode";
    searchHere.style.backgroundColor = colors.white;
    searchHere.style.borderColor = "#d7d7d7";
    searchHere.style.color = colors.black;
    document.body.style.backgroundColor = colors.white;
    document.body.style.color = colors.black;
    document.querySelector("#noteTitle").style.backgroundColor = colors.white;
    document.querySelector("#noteTitle").style.color = colors.black;
    document.querySelector("textarea").style.backgroundColor = colors.white;
    document.querySelector("textarea").style.color = colors.black;
    document.querySelector(".card-body").style.backgroundColor = colors.white;
    if (noteCard != undefined) {
      for (let i = 0; i < noteCard.length; i++) {
        noteCard[i].style.backgroundColor = colors.white;
        noteCard[i].style.borderColor = "#d7d7d7";
      }
    }
  }
}

renderNotes();

let addBtn = document.getElementById("addBtn");
let noteDesc = document.getElementById("noteDesc");
let noteTitle = document.getElementById("noteTitle");
addBtn.addEventListener("click", function () {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  let notesObj = {
    title: noteTitle.value,
    description: noteDesc.value,
  };
  notesArr.push(notesObj);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  noteDesc.value = "";
  noteTitle.value = "";
  renderNotes();
});

function renderNotes() {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  let html = "";
  notesArr.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index + 1}. ${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i>&nbsp;&nbsp;Delete Note</button>
                </div>
            </div>`;
  });
  let notesSec = document.getElementById("notesSec");
  if (notesArr.length !== 0) {
    notesSec.innerHTML = html;
  } else {
    notesSec.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  notesArr.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  renderNotes();
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let inputTxt = searchHere.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (elem) {
    let cardTitle = elem.getElementsByTagName("h5")[0].textContent;
    let noteHeading = cardTitle.toLowerCase();
    if (noteHeading.includes(inputTxt)) {
      elem.style.display = "block";
    } else {
      elem.style.display = "none";
    }
  });
});

searchHere.addEventListener("input", function () {
  if (searchHere.value === "") {
    renderNotes();
  }
});

noteTitle.addEventListener("click", () => {
  noteTitle.setAttribute("autofocus", "true");
  noteDesc.removeAttribute("autofocus", "true");
});

noteDesc.addEventListener("click", () => {
  noteDesc.setAttribute("autofocus", "true");
  noteTitle.removeAttribute("autofocus", "true");
});

function clearTxt() {
  let activeEl = document.querySelector('[autofocus="true"]');
  activeEl.value = "";
}

function removeSpace() {
  let activeEl = document.querySelector('[autofocus="true"]');
  let wrongTxt = activeEl.value;
  let rightTxt = wrongTxt.split(/[ ]+/);
  activeEl.value = rightTxt.join(" ");
}

function boldTxt() {
  let activeEl = document.querySelector('[autofocus="true"]');
  activeEl.style.fontWeight = "bold";
  activeEl.style.fontStyle = "none";
  activeEl.style.textDecoration = "none";
  activeEl.style.textTransform = "none";
}

function italicTxt() {
  let activeEl = document.querySelector('[autofocus="true"]');
  activeEl.style.fontStyle = "italic";
  activeEl.style.fontWeight = "normal";
  activeEl.style.textDecoration = "none";
  activeEl.style.textTransform = "none";
}

function underlineTxt() {
  let activeEl = document.querySelector('[autofocus="true"]');
  activeEl.style.textDecoration = "underline";
  activeEl.style.fontWeight = "normal";
  activeEl.style.fontStyle = "normal";
  activeEl.style.textTransform = "none";
}

function lowercase() {
  let activeEl = document.querySelector('[autofocus="true"]');
  activeEl.style.textTransform = "lowercase";
  activeEl.style.fontWeight = "normal";
  activeEl.style.textDecoration = "none";
  activeEl.style.fontStyle = "normal";
}

function uppercase() {
  let activeEl = document.querySelector('[autofocus="true"]');
  activeEl.style.textTransform = "uppercase";
  activeEl.style.fontWeight = "normal";
  activeEl.style.textDecoration = "none";
  activeEl.style.fontStyle = "normal";
}
