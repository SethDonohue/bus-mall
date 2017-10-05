'use strict';


//=========================Variables accessable by everything (GLOBAL and Attatched to Objects)=========================

// ++++++++++++++++++++++++++++++++++++++++ -----1-----*** This is purely for my thoguth process to keep track of the order I built
//Array to store All Objects  things
Pictures.allInfo = [];
//Keep track of user click left
Pictures.userClicksLeft = 24;
//track previously deisplayed images
Pictures.lastImages = [];



// ++++++++++++++++++++++++++++++++++++++++ -----4------
// refer to imgs from HTML
var oneEl = document.getElementById('one');
var twoEl = document.getElementById('two');
var threeEl = document.getElementById('three');
//chart variables
var votesChart;
// var chartDrawn = false;
//Arrays to hold Data for the Charts
var totalVotes = [];
var titles = [];
var totalViews = [];

//=========================CONSTRUCTORS=========================

// ++++++++++++++++++++++++++++++++++++++++ -----2------
// Constructor to create Image objects
//needs to store views, votes, name, filepath.... PUsh to all data storing array
function Pictures (name, filePath, altName) {
  this.name = name;
  this.filePath = filePath;
  this.altName = altName;
  this.views = 0;
  this.votes = 0;
  Pictures.allInfo.push(this);
};

//=========================INSTANCES / NEW OBJECTS=========================

if(Boolean(localStorage.test) === true) {
  // retrieve storage
  console.log('LOCAL STORAGE EXISTS');
  Pictures.allInfo = JSON.parse(localStorage.allInfo);
}else {
  console.log('NO LOCAL STORAGE');
  //LOCAL STORAGE function
  // set storage/instances
  // ++++++++++++++++++++++++++++++++++++++++ -----3------
  //make new Image instances/ objects
  new Pictures ('Bag', 'img/bag.jpg','bag');
  new Pictures ('Banana', 'img/banana.jpg','banana');
  new Pictures ('Bathroom', 'img/bathroom.jpg','bathroom');
  new Pictures ('Boots', 'img/boots.jpg','boots');
  new Pictures ('Breakfast', 'img/breakfast.jpg','breakfast');
  new Pictures ('Bubblegum', 'img/bubblegum.jpg','bubblegum');
  new Pictures ('Chair', 'img/chair.jpg','chair');
  new Pictures ('Cthulhu', 'img/cthulhu.jpg','cthulhu');
  new Pictures ('Dog Duck', 'img/dog-duck.jpg','dogduck');
  new Pictures ('Dragon', 'img/dragon.jpg','dragon');
  new Pictures ('Pen', 'img/pen.jpg','pen');
  new Pictures ('Pet Sweep', 'img/pet-sweep.jpg','petsweep');
  new Pictures ('Scissors', 'img/scissors.jpg','scissors');
  new Pictures ('Shark', 'img/shark.jpg','shark');
  new Pictures ('Sweep', 'img/sweep.png','sweep');
  new Pictures ('Tauntaun', 'img/tauntaun.jpg','tauntaun');
  new Pictures ('Unicorn', 'img/unicorn.jpg','unicorn');
  new Pictures ('Usb', 'img/usb.gif','usb');
  new Pictures ('Water Can', 'img/water-can.jpg','watercan');
  new Pictures ('Wine Glass', 'img/wine-glass.jpg','wineglass');
};


//=========================FUNCTION DECLARATIONS=========================


//Random Index creator
Pictures.randomIndex = function () {
  var randomOne =  (Math.floor(Math.random() * Pictures.allInfo.length));
  var randomTwo =  (Math.floor(Math.random() * Pictures.allInfo.length));
  var randomThree =  (Math.floor(Math.random() * Pictures.allInfo.length));
  return [randomOne, randomTwo, randomThree];
};

// ++++++++++++++++++++++++++++++++++++++++ -----5------
//funcTion to randomly display an Image
Pictures.randomImage = function () {
  //generate random indexes/indices
  //NEED TO  using fucntion to DRY code
  var random = Pictures.randomIndex ();
  // console.log('Random index Numbers: ', random);

  // ++++++++++++++++++++++++++++++++++++++++ -----6------
  //make sure each image was not used in last sequence! If they are randomize them again
  while (Pictures.lastImages.includes(random[0]) || Pictures.lastImages.includes(random[1]) ||   Pictures.lastImages.includes(random[2])) {
    // console.log(' Picture used last turn!');
    random = Pictures.randomIndex ();
  }

  // ++++++++++++++++++++++++++++++++++++++++ -----7------
  // make sure the random images on current view are not equal to each other!!! If they are randomize them again
  while (random[0] === random[1] || random[0] === random[2] || random[1] === random[2]) {
    // console.log(' Current pictures are equal to each other! Redraw to remove duplicates!!! ');
    random = Pictures.randomIndex ();
  }

  // ++++++++++++++++++++++++++++++++++++++++ -----8------
  // Update Source for each image
  oneEl.src = Pictures.allInfo[random[0]].filePath;
  twoEl.src = Pictures.allInfo[random[1]].filePath;
  threeEl.src = Pictures.allInfo[random[2]].filePath;

  //update Alt for each image
  oneEl.alt = Pictures.allInfo[random[0]].altName;
  twoEl.alt = Pictures.allInfo[random[1]].altName;
  threeEl.alt = Pictures.allInfo[random[2]].altName;

  // ++++++++++++++++++++++++++++++++++++++++ -----9------
  // INCREMENT the views on these images
  Pictures.allInfo[random[0]].views++;
  // Pictures.views = Pictures.allInfo[random[0]].views;
  Pictures.allInfo[random[1]].views++;
  // Pictures.views = Pictures.allInfo[random[1]].views;
  Pictures.allInfo[random[2]].views++;
  // console.log('VIEWS', Pictures.allInfo[random[2]].views);
  // Pictures.views = Pictures.allInfo[random[2]].views;

  // ++++++++++++++++++++++++++++++++++++++++ -----10------
  // KEEP TRACK of these images / add to lastImages, array methods OR overwrite array
  Pictures.lastImages[0] = random[0];
  Pictures.lastImages[1] = random[1];
  Pictures.lastImages[2] = random[2];
};

Pictures.showResults = function () {
  for (var i = 0; i < Pictures.allInfo.length; i++) {
    //get total views and votes for an elements
    var views = Pictures.allInfo[i].views;
    var votes = Pictures.allInfo[i].votes;
    // console.log(Pictures.allInfo[i].views);
    // console.log(Pictures.allInfo[i].votes);

    //put views onto screen?
    // create li element
    var ulEl = document.getElementById('results');
    var liEl = document.createElement('li');

    //add conent to li
    // console.log('liEl: ',liEl);
    liEl.textContent = Pictures.allInfo[i].name.toUpperCase() + ' has ' + views + ' views and ' + votes + ' votes.';

    ulEl.appendChild(liEl);
  }
};

//=========================CHART=========================
// ++++++++++++++++++++++++++++++++++++++++ -----13------

function drawChart() {

  var ctx = document.getElementById('chart').getContext('2d');
  votesChart = new Chart(ctx,{
    type: 'bar',
    data: {
      labels: titles,
      datasets: [{
        label: '# of Votes',
        data: totalVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
  // chartDrawn = true;
}

// function hideChart() {
//   document.getElementById('funky-chart').hidden = true;
// }


//=========================EVENT HANLDER=========================
Pictures.onClick = function(e) {
  //input validation


  //kick out if we hit maximum clicks, stop event listener
  if(Pictures.userClicksLeft < 1) {
    // console.log('out of votes');
    localStorage.allInfo = JSON.stringify(Pictures.allInfo);
    localStorage.test = true;

    //stop event listener
    oneEl.removeEventListener('click',Pictures.onClick);
    twoEl.removeEventListener('click',Pictures.onClick);
    threeEl.removeEventListener('click',Pictures.onClick);
    //SHOW RESULTS, function to show resultsList
    Pictures.showResults();
    drawChart ();
    document.getElementById('voting').innerHTML = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('header1').textContent = 'Here are the Votes Per Item after 25 votes.';

    // var result = [];

    // for (var i = 0; i < Pictures.allInfo.length; i++) {
    //   var obj = {
    //     Pictures.allInfo[i].name: Pictures.allInfo[i].votes;
    //   }
    //   return obj;
    // }
  }

  //INCREMENT total clicks
  Pictures.userClicksLeft--;

  //tracker for what target index?
  // console.log('Start Target: ', e.target.altName);
  // var title = '';

  //count votes for each image, if image is selected then add to it's vote total
  for (var i = 0; i < Pictures.allInfo.length; i++) {
    // console.log('allInfo Length: ', Pictures.allInfo.length);
    titles[i] = Pictures.allInfo[i].name;
    totalViews[i] = Pictures.allInfo[i].views;
    // console.log(Pictures.allInfo[i].altName === e.target.alt);
    if (Pictures.allInfo[i].altName === e.target.alt) {
      // console.log('!!!! VOTE COUNTED !!!', Pictures.userClicksLeft);
      Pictures.allInfo[i].votes++;
      totalVotes[i] = Pictures.allInfo[i].votes;
      break;
    }
    // totalVotes[i] = Pictures.allInfo[i].votes;
  }

  //render new images , use existing function
  Pictures.randomImage();

};


//=========================FUNCTIONAL CODE ON PAGE LOAD & EVENT LISTNERS=========================

//Event Listner to wait for CLICK on Images
// ++++++++++++++++++++++++++++++++++++++++ -----12------
oneEl.addEventListener('click', Pictures.onClick);
twoEl.addEventListener('click', Pictures.onClick);
threeEl.addEventListener('click', Pictures.onClick);

// ++++++++++++++++++++++++++++++++++++++++ -----11------
// Call random Image on page load!
Pictures.randomImage();
