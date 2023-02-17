// id:114
$(document).ready(function () {
  const getAllTasks = function () {
    $.ajax({
      type: "GET",
      url: "https://fewd-todolist-api.onrender.com/tasks?api_key=114",
      dataType: "json",
      success: function (response, textStatus) {
        $("#todo-list").empty();

        let returnActive = response.tasks.filter(function (task) {
          if (!task.completed) {
            return task.id;
          }
        });
        let returnCompleted = response.tasks.filter(function (task) {
          if (task.completed) {
            console.log(task.id);
            return task.id;
          }
        });
        let taskItems;

        let filter = $(".active").attr("id");
        console.log(filter);

        if (filter == "all" || filter === "") {
          taskItems = response.tasks;
        } else if (filter === "active") {
          taskItems = returnActive;
        } else {
          taskItems = returnCompleted;
        }
        console.log(taskItems);

        taskItems.forEach((task) => {
          $("#todo-list").append(
            '<div class="row toDo-content"><p class="col-xs-8">' +
              task.content +
              '</p><button class="btn btn-danger delete" data-id="' +
              task.id +
              '">Delete</button><input type="checkbox" class="mark-complete" data-id="' +
              task.id +
              '"' +
              (task.completed ? "checked" : "") +
              ">"
          );
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  const markTaskActive = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://fewd-todolist-api.onrender.com/tasks/" +
        id +
        "/mark_active?api_key=114",
      success: function (response, textStatus) {
        getAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  const markComplete = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://fewd-todolist-api.onrender.com/tasks/" +
        id +
        "/mark_complete?api_key=114",
      success: function (response, textStatus) {
        getAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $(document).on("change", ".mark-complete", function () {
    if (this.checked) {
      markComplete($(this).data("id"));
    } else {
      markTaskActive($(this).data("id"));
    }
  });

  const deleteTask = function (id) {
    $.ajax({
      type: "DELETE",
      url:
        "https://fewd-todolist-api.onrender.com/tasks/" + id + "?api_key=114",
      success: function (response, textStatus) {
        getAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  $(".to-do-filter button").on("click", function () {
    $(this).addClass("active");
    console.log($(this));

    $(this).siblings().removeClass("active");
    getAllTasks();
  });
  $(document).on("click", ".delete", function () {
    deleteTask($(this).data("id"));
  });

  const createTask = function () {
    $.ajax({
      type: "POST",
      url: "https://fewd-todolist-api.onrender.com/tasks?api_key=114",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        task: {
          content: $("#new-task-content").val(),
        },
      }),
      success: function (response, textStatus) {
        $("#new-task-content").val("");
        getAllTasks();
        console.log("did post!");
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  $("#create-task").on("submit", function (event) {
    event.preventDefault();
    createTask();
  });
  getAllTasks();
});
