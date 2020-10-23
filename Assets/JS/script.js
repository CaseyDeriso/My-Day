test = false;

let currentHour = moment()
  .format("LT") // 7:44 PM
  .substring(1, 0); // "7"

$(window).on("mousemove", function () {
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
});
