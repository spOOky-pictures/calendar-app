function callBackend() {
    fetch("https://spooky.si/calendar-app/api/krneki")
      .then(res => res.text())
      .then(data => {
        document.getElementById("response").textContent = data;
      });
  }