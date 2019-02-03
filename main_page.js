//This class represents the main page
var numS;
var numP;
var numR;
var rslts = [];
// let i = 0;
// let p = i;
// let k = p;


class MainPage {
  constructor(achievedContainer, progressContainer, menuButton){
    this.achievedContainer = achievedContainer;
    this.progressContainer = progressContainer;
    this.menuButton = progressContainer;
    this.points().then((results) => {
      rslts = results;
    });

    this.fillPics(productivity);
    this.fillPics(reading);
    this.fillPics(social);
    this.fillAchievements;


  }

  fillAchievements(num, category){
    console.log("fillachieve");
    let images = [];
    //console.log(images.item(0));
    for(const outerKey in category){
      if(category === productivity){
      images = document.querySelectorAll(".blacknwhitep");
    }
    else if(category === reading){
    images = document.querySelectorAll(".blacknwhiter");
    }
    else images = document.querySelectorAll(".blacknwhites");
      console.log(images.length);
      if(num >= category[outerKey].time){
        category[outerKey].achieved = "yes";
        images.item(0).setAttribute("class", "");
        console.log(images.item(0));
      }
    }
  }

  // fillAchievements(numR, numS, numP){
  //   let images = [];
  //   images = document.querySelectorAll("#blacknwhite");
  //   for(const outerKey in productivity){
  //     if(numP >= productivity[outerKey].time){ //achievement unlocked
  //       productivity[outerKey].achieved = "yes";
  //       console.log(outerKey + " achieved");
  //       images.item(i).removeAttribute("id");
  //       console.log(images.item(i));
  //       i--;
  //     }
  //     i++;
  //   }
  //
  //   for(const outerKey in reading){
  //     if(numR >= reading[outerKey].time){ //achievement unlocked
  //       reading[outerKey].achieved = "yes";
  //       console.log(outerKey + " achieved");
  //       images.item(p).removeAttribute("id");
  //       console.log(images.item(p));
  //       p--;
  //     }
  //     p++;
  //   }
  //
  //       for(const outerKey in social){
  //         if(numS >= social[outerKey].time){ //achievement unlocked
  //           social[outerKey].achieved = "yes";
  //           console.log(outerKey + " achieved");
  //           images.item(k).removeAttribute("id");
  //           console.log(images.item(k));
  //           k--;
  //         }
  //         k++;
  //       }
  //
  // }

  points() { //changes the productivity points
    console.log("points");
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
        console.log(numP); //productivity
        console.log(numR);//reading
        console.log(numS);//social
        //this.fillAchievements(numR, numS, numP);

        let total = Math.ceil((numR) + (numP) - (numS));//25 for R and P, 10 for S
        if(total <= 0 || total === 'NaN'){
        pointsContainer.innerHTML = 0;
        }
       else  pointsContainer.innerHTML = total;

        //Stats
        let perS = Math.floor(100*numS/(numR + numP + numS));
        let perR = Math.floor(100*numR/(numR + numP + numS));
        let perP = Math.floor(100*numP/(numR + numP + numS));

        let row1 = document.createElement("div");
        let row2 = document.createElement("div");
        let row3 = document.createElement("div");

        row1.className = "row";
        row2.className = "row";
        row3.className = "row";

        if(total === 0){
          perS = 0;
          perP = 0;
          perR = 0;
        }

        row1.innerHTML = "Social Media: "+ perS +"%";
        row2.innerHTML = "Productivity: "+ perP+"%";
        row3.innerHTML = "Reading & Ref.: "+ perR+"%";

        this.progressContainer.appendChild(row1);
        this.progressContainer.appendChild(row2);
        this.progressContainer.appendChild(row3);

        this.fillAchievements(numP, productivity);
        this.fillAchievements(numR, reading);
        this.fillAchievements(numS, social);

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
            if(category === productivity){
            image.className = "blacknwhitep";
          }
          else if(category === reading){
          image.className = "blacknwhiter";
        }
        else image.className = "blacknwhites";
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
        if(category === productivity){
        image2.className = "blacknwhitep";
      }
      else if(category === reading){
      image2.className = "blacknwhiter";
    }
    else image2.className = "blacknwhites";
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

  // loadProgress(category){
  //   let trophyContainer = this.progressContainer.querySelector("#emoji");
  //   for(const outerKey in category){
  //     let image = document.createElement("img");
  //     image.id = "trophypic";
  //         if(category[outerKey].inprogress === "yes"){ //if achievement in progress
  //           image.src = ""+ category[outerKey].picUrl;
  //           console.log(category[outerKey].picUrl);
  //         }
  //     trophyContainer.appendChild(image);
  //   }
  //   this.progressContainer.appendChild(trophyContainer);
  // }

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
