$("document").ready(function() {
  $("#content").css({
    "background-color": "skyblue",
    padding: "10px",
    "border-radius": "5px",
  });
  $(".currentTime").css("background-color", "brown");

  let showTime = setInterval(timer, 1000);

  function timer() {
    let currentTime = new Date();
    let time = currentTime.toLocaleTimeString();
    $(".currentTime").html("Time: " + time);
  }

  function StopWatch() {
    let startTime,
      endTime,
      pauseTime,
      running,
      duration = 0;

    this.start = function() {
      if (running) {
        $(".new_status").addClass("error_status");
        $(".error_status").html(
          "Stop Watch has already started at:<br>" +
            startTime.toLocaleTimeString()
        );
      } else {
        if (duration > 0) {
          $("p").removeClass("reset_status");
          $("p").addClass("error_status");
          $(".error_status").html(
            "Stop Watch is paused!<br>Stop Watch was paused at:<br>" +
              pauseTime.toLocaleTimeString() +
              "<br>The duration is: " +
              duration.toFixed(1) +
              " Seconds."
          );
        } else {
          running = true;
          startTime = new Date();
          $("p").removeClass("error_status");
          $("p").removeClass("reset_status");
          $("p").addClass("new_status");
          $(".new_status").html(
            "Stop Watch has started at:<br>" + startTime.toLocaleTimeString()
          );
        }
      }
    };

    this.pause = function() {
      if (!running) {
        if (duration > 0) {
          $("p").removeClass("reset_status");
          $("p").addClass("error_status");
          $(".error_status").html(
            "Stop Watch is paused!<br>Stop Watch was paused at:<br>" +
              pauseTime.toLocaleTimeString() +
              "<br>The duration is: " +
              duration.toFixed(1) +
              " Seconds."
          );
        } else {
          $("p").removeClass("reset_status");
          $("p").addClass("error_status");
          $(".error_status").text("Stop Watch is not started!");
        }
      } else {
        running = false;
        endTime = new Date();
        let seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds;
        pauseTime = endTime;
        $("p").removeClass("error_status");
        $("p").addClass("new_status");
        $(".new_status").html(
          "Stop Watch has paused at:<br>" +
            endTime.toLocaleTimeString() +
            ".<br>The duration is: " +
            duration.toFixed(1) +
            " Seconds."
        );
        startTime = null;
        endTime = null;
      }
    };

    this.play = function() {
      if (running) {
        $("p").removeClass("new_status");
        $("p").addClass("error_status");
        $(".error_status").html(
          "Stop Watch is running!<br>Stop Watch started at:<br>" +
            startTime.toLocaleTimeString()
        );
      } else {
        if (duration > 0) {
          running = true;
          startTime = new Date();
          $("p").removeClass("error_status");
          $("p").removeClass("reset_status");
          $("p").addClass("new_status");
          $(".new_status").html(
            "Stop Watch has continued running at:<br>" +
              startTime.toLocaleTimeString()
          );
        } else {
          $("p").removeClass("reset_status");
          $("p").removeClass("new_status");
          $("p").addClass("error_status");
          $(".error_status").text("Stop Watch is not started!");
        }
      }
    };

    this.stop = function() {
      if (!running) {
        if (duration > 0) {
          $("p").removeClass("error_status");
          $("p").addClass("new_status");
          $(".new_status").html(
            "Stop Watch was paused at:<br>" +
              pauseTime.toLocaleTimeString() +
              ".<br>Stop Watch has stopped at:<br>" +
              pauseTime.toLocaleTimeString() +
              ".<br>The duration is: " +
              duration.toFixed(1) +
              " Seconds."
          );
          duration = 0;
        } else {
          $("p").removeClass("reset_status");
          $("p").addClass("error_status");
          $(".error_status").text("Stop Watch is not started!");
        }
      } else {
        if (duration > 0) {
          running = false;
          endTime = new Date();
          const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
          duration = duration + seconds;
          $("p").removeClass("error_status");
          $("p").addClass("new_status");
          $(".new_status").html(
            "Stop Watch has stopped at:<br>" +
              endTime.toLocaleTimeString() +
              ".<br>The duration is: " +
              duration.toFixed(1) +
              " Seconds."
          );
          startTime = null;
          endTime = null;
          duration = 0;
        } else {
          running = false;
          endTime = new Date();
          const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
          duration += seconds;
          $("p").removeClass("error_status");
          $("p").addClass("new_status");
          $(".new_status").html(
            "Stop Watch has stopped at:<br>" +
              endTime.toLocaleTimeString() +
              ".<br>The duration is: " +
              duration.toFixed(1) +
              " Seconds."
          );
          startTime = null;
          endTime = null;
          duration = 0;
        }
      }
    };

    this.reset = function() {
      startTime = null;
      endTime = null;
      running = false;
      duration = 0;
      $("p").removeClass("error_status");
      $("p").addClass("reset_status");
      $(".reset_status").text("Stop Watch has reset.");
    };

    Object.defineProperty(this, "duration", {
      get: function() {
        return duration;
      },
    });
  }

  const myStopWatch = new StopWatch();

  $(".start").on("click", function() {
    myStopWatch.start();
  });

  $(".pause").on("click", function() {
    myStopWatch.pause();
  });

  $(".play").on("click", function() {
    myStopWatch.play();
  });

  $(".stop").on("click", function() {
    myStopWatch.stop();
  });

  $(".reset").on("click", function() {
    myStopWatch.reset();
  });
});
