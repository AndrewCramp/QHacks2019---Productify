//This class represents the main page
var numS;
var numP;
var numR;
var rslts = [];

class MainPage {
  constructor(achievedContainer, progressContainer, menuButton){
    this.achievedContainer = achievedContainer;
    this.progressContainer = progressContainer;
    this.menuButton = progressContainer;
    this.fillPics(productivity);
    this.fillPics(reading);
    this.fillPics(social);
    this.loadProgress(productivity);
    this.loadProgress(reading);
    this.loadProgress(social);
    // this.loadBar();
    this.points().then((results) => {
      rslts = results;
    });
  }

  points() { //changes the productivity points
    return new Promise((resolve, reject) => {
      let pointsContainer = this.achievedContainer.querySelector("#points");

      Promise.all([
          this.pointsSocial(),
          this.productivityPoints(),
          this.readingPoints()
      ]).then((resultsArray) => {
        let numS = resultsArray[0];
        let numP = resultsArray[1];
        let numR = resultsArray[2];

        numP = numP/60000.0; //minutes
        numR = numR/60000.0;
        numS = numS/60000.0;
        console.log(numP);
        console.log(numR);
        console.log(numS);

        let total = Math.ceil((numR/1) + (numP/1) - (numS/1));//25 for R and P, 10 for S
        if(total <= 0 || total === 'NaN'){
          pointsContainer.innerHTML = 0;
        }
        else pointsContainer.innerHTML = total;

        resolve([numP, numR, numS]);
      });
    });
  }

  productivityPoints(){
    return new Promise((onSuccess)=>{
      chrome.storage.sync.get(['Productivity'], function(result){
        onSuccess(result.Productivity);
          });
      });
    }

  readingPoints(){
    return new Promise((onSuccess)=>{
      chrome.storage.sync.get(['Reading'], function(result){
        onSuccess(result.Reading);
          });
      });
    }

  pointsSocial(){
    return new Promise((onSuccess)=>{
      chrome.storage.sync.get(['Social'], function(result){
        onSuccess(result.Social);
      });
    });
  }

  fillPics(category){
    //pull the tbody
    // console.log("fill these pics");
    let table = document.createElement("table");
    table.className = "table";
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    let i = 0; //counter for my map
        for(const outerKey in category){ //iterate through pic titles
          let td = document.createElement("td");
          td.id = "grid";
          let image = document.createElement("img");
          image.src = ""+ category[outerKey].picUrl;
          image.height = ""+30;
          //append image to td here
          if(category[outerKey].achieved === "no"){
            image.id = "blacknwhite";
          }
          td.appendChild(image);
          //append td to tr here
          tr.appendChild(td);
          i++;
          if(i === 3){
            i = 0;
            break;
          }
        }
        //append tr to tbody here
    tbody.appendChild(tr);

    //second row time!!
    let tr2 = document.createElement("tr");
    for(const outerKey in category){ //iterate through pic titles
        // console.log("hi");
      if(i >= 3){
      let td2 = document.createElement("td");
      //console.log(outerKey);
      td2.id = "grid";
      let image2 = document.createElement("img");
      image2.src = ""+ category[outerKey].picUrl;
      image2.height = ""+30;
      //append image to td here
      td2.appendChild(image2);
      if(category[outerKey].achieved === "no"){
        image2.id = "blacknwhite";
      }

      //append td to tr here
      tr2.appendChild(td2);
      }
      i++;
    }
    tbody.appendChild(tr2);
    //  console.log(tbody);
    table.appendChild(tbody);
    this.achievedContainer.appendChild(table);
  }

  loadProgress(category){
    let trophyContainer = this.progressContainer.querySelector("#emoji");
    for(const outerKey in category){
      let image = document.createElement("img");
      image.id = "trophypic";
          if(category[outerKey].inprogress === "yes"){ //if achievement in progress
            image.src = ""+ category[outerKey].picUrl;
            console.log(category[outerKey].picUrl);
          }
      trophyContainer.appendChild(image);
    }
    this.progressContainer.appendChild(trophyContainer);
  }

  // loadBar(category){
  //   let barContainer = this.progressContainer.querySelector("#bar");
  //   for(const outerKey in category){
  //       if(category[outerKey].inprogress === "yes"){// if in prgress
  //         let whiteBar = document.createElement("div");
  //         whiteBar.className = "progress";
  //         let blueBar = document.createElement("div");
  //         blueBar.className = "progress-bar";
  //         blueBar.role = "progressbar";
  //         blueBar.aria-valuemax = "100";
  //         blueBar.aria-valuemin = "0";
  //         //check which category
  //         if(category === productivity){
  //
  //         }
  //         else if(category === social){
  //
  //         }
  //         else { //category is reading
  //
  //         }
  //       }
  //   }
  // }


}
