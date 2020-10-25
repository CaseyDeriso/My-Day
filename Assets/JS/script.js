let currentHour = moment().hour();
localStorage.setItem("placeHolder", "Type your task here")

// display date at top of table element. 
$("#date").text(moment().format('MMMM Do YYYY'));

const changeClasses = function () {
  let timeSlotEl = $("tbody").children();

  for (let i = 0; i < timeSlotEl.length; i++) {
    // create a table with all possible table color classes
    let classes = ["table-active", "table-primary", "table-success"];
    // get reference to current time slot in for loop
    let currentEl = timeSlotEl[i];
    // get the ID of the current time slot
    let currentId = $(currentEl).attr("id");
    // remove table color classes
    $(currentEl).removeClass(classes);
    // change classes if neccesary.
    if (currentId == currentHour) {
      $(currentEl).prevAll().addClass("table-active");
      $(currentEl).addClass("table-primary");
      $(currentEl).nextAll().addClass("table-light");
    }
  }
};

const updateDescriptions = function () {
  // get reference to each time slot row as an array
  let timeSlots = $("tbody").children();
  // loop though the array and replace with localStorage if neccessary
  for (let i = 0; i < timeSlots.length; i++) {
    currentSlot = timeSlots[i];
    // get the children of the slot
    slotChildren = $(currentSlot).children();
    // select the descrption td element
    slotDescription = slotChildren[1];
    // get the id of the description
    descriptionId = $(slotDescription).attr("id");
    // set conditional statement to see if there is a description stored on local storage
    if (localStorage.getItem(descriptionId) == "undefined" || localStorage.getItem(descriptionId) == undefined) {
        $(slotDescription).empty();
        $(slotDescription).html(localStorage.getItem("placeHolder"));
    } else {
      $(slotDescription).empty();
      $(slotDescription).html(localStorage.getItem(descriptionId));
    }
  }
};

// description text was clicked, replace with text input to edit description
$("td[id]").on("click", function (event) {
  event.preventDefault();

  let text = $(this).text().trim();
  let textInput = $("<textarea>").val(text);
  $(this).html(textInput);
  textInput.trigger("focus");
});
// user clicked save button, save the edit and replace with new text
// update local storage with item description
$(".btn").on("click", function (event) {
  event.preventDefault();
  // get referece to the td element
  let tdEl = $(this).parent().prev();
  // get the id
  let tdId = tdEl.attr("id");
  // get the value of the form input for corresponding save buttom
  let text = tdEl.children().val();
  // save id and description to local storage
  localStorage.setItem(tdId, text);
  // update the table
  updateDescriptions();
});

updateDescriptions();
$(document).ready(changeClasses);
const updateTimer = setInterval(changeClasses, 900000);
