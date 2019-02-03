//This class will establish all the elements and the other tabs and pages
//lets hope it works!

class App{
  constructor(){
    //create the main page
    const achievedContainer = document.querySelector(".achieved");
    const progressContainer = document.querySelector(".progressing");
    const menuButton = document.querySelector("#menu");
    this.mainpage = new MainPage(achievedContainer, progressContainer, menuButton);


    //create the stats page with NO display until clicked
  }
}
