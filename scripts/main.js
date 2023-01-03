const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/montana_bike_doctor.jpeg") {
    myImage.setAttribute("src", "images/red_river.jpeg");
  } else {
    myImage.setAttribute("src", "images/montana_bike_doctor.jpeg");
  }
};