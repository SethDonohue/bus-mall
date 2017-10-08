'use strict';

//==================Variables accessable by everything (GLOBAL and Attatched to Objects)====================

// ++++++++++++++++++++++++++++++++++++++++ -----1-----*** This is purely for my thought process to keep track of the order I built
//Array to store All Objects  things
Pictures.allInfo = [];
//Keep track of user click left
Pictures.userVotes = 0;
//track previously deisplayed images
Pictures.lastImages = [];



// ++++++++++++++++++++++++++++++++++++++++ -----4------
// refer to imgs from HTML
var oneEl = document.getElementById('one');
var twoEl = document.getElementById('two');
var threeEl = document.getElementById('three');
//chart variables
var votesChart;
//Arrays to hold Data for the Charts
var totalVotes = [];
var titles = [];
var totalViews = [];

//=========================CONSTRUCTORS=========================

// ++++++++++++++++++++++++++++++++++++++++ -----2------
// Constructor to create Image objects
function Pictures (name, filePath, alt) {
  this.name = name;
  this.filePath = filePath;
  this.alt = alt;
  this.views = 0;
  this.votes = 0;
  Pictures.allInfo.push(this);
};

//=========================INSTANCES / NEW OBJECTS=========================

// If localstorage exists then retrieve storage
if(localStorage.allInfo) {
  console.log('LOCAL STORAGE EXISTS');
  console.log(typeof(localStorage.summedVotes));
  Pictures.allInfo = JSON.parse(localStorage.allInfo);
  // Total votes across all userVotes
  console.log('Summed Votes from Storage: ', localStorage.summedVotes);
  console.log(typeof(localStorage.summedVotes));
  Pictures.summedVotes = parseInt(localStorage.summedVotes);
  console.log(typeof(Pictures.summedVotes));


}else {
  console.log('NO LOCAL STORAGE');
  Pictures.summedVotes = 0;
  // ++++++++++++++++++++++++++++++++++++++++ -----3------
  //If local storage doesn't exist then make new Image instances/ objects

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
//function to randomly display an Image
Pictures.randomImage = function () {
  //Store a RandomIndex to chose form the allInfo array
  var random = Pictures.randomIndex ();

  // ++++++++++++++++++++++++++++++++++++++++ -----6------
  //make sure each image was not used in last sequence! If they are randomize them again
  while (Pictures.lastImages.includes(random[0]) || Pictures.lastImages.includes(random[1]) ||   Pictures.lastImages.includes(random[2])) {
    console.log(' Picture used last turn!');
    random = Pictures.randomIndex ();
  }

  // ++++++++++++++++++++++++++++++++++++++++ -----7------
  // make sure the random images on current view are not equal to each other!!! If they are randomize them again
  while (random[0] === random[1] || random[0] === random[2] || random[1] === random[2]) {
    console.log(' Current pictures are equal to each other! Redraw to remove duplicates!!! ');
    random = Pictures.randomIndex ();
  }

  // ++++++++++++++++++++++++++++++++++++++++ -----8------
  // Update Source and Alt for each image
  oneEl.src = Pictures.allInfo[random[0]].filePath;
  oneEl.alt = Pictures.allInfo[random[0]].alt;
  twoEl.src = Pictures.allInfo[random[1]].filePath;
  twoEl.alt = Pictures.allInfo[random[1]].alt;
  threeEl.src = Pictures.allInfo[random[2]].filePath;
  threeEl.alt = Pictures.allInfo[random[2]].alt;


  // ++++++++++++++++++++++++++++++++++++++++ -----9------
  // INCREMENT the views on these images
  Pictures.allInfo[random[0]].views++;
  Pictures.allInfo[random[1]].views++;
  Pictures.allInfo[random[2]].views++;

  // ++++++++++++++++++++++++++++++++++++++++ -----10------
  // KEEP TRACK of these images / add to lastImages, array methods OR overwrite array
  Pictures.lastImages[0] = random[0];
  Pictures.lastImages[1] = random[1];
  Pictures.lastImages[2] = random[2];
};

//Shows results before chart, CURRENTLY OBSOLETE AS NOW USING CHART.JS
Pictures.showResults = function () {
  for (var i = 0; i < Pictures.allInfo.length; i++) {
    //get total views and votes for an elements
    var views = Pictures.allInfo[i].views;
    var votes = Pictures.allInfo[i].votes;

    // create li element
    var ulEl = document.getElementById('results');
    var liEl = document.createElement('li');

    //add conent to li
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
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

//=========================EVENT HANLDER=========================
Pictures.onClick = function(e) {

  //kick out if we hit maximum clicks
  if(Pictures.userVotes > 23) {
    console.log('out of votes');
    //Store info into localstoarge
    localStorage.allInfo = JSON.stringify(Pictures.allInfo);

    //add 25 to toal summed votes for all users
    Pictures.summedVotes = (Pictures.summedVotes + 25);
    localStorage.summedVotes = Pictures.summedVotes;

    //stop event listeners
    oneEl.removeEventListener('click',Pictures.onClick);
    twoEl.removeEventListener('click',Pictures.onClick);
    threeEl.removeEventListener('click',Pictures.onClick);

    //SHOW RESULTS, function to show resultsList
    Pictures.showResults(); //OBOSOLETE DUE TO CHART

    //Create Chart
    drawChart ();

    // Clear out instructions, pictures and listed results to show chart
    document.getElementById('voting').innerHTML = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('instructions').innerHTML = '';

    //Change the header to address chart
    document.getElementById('header1').textContent = 'Here are the Cumulative Votes Per Item after ' + Pictures.summedVotes + ' total votes.';
    document.getElementById('header2').textContent = (Pictures.summedVotes / 25) + ' users have voted.';

  }

  //Decrement total clicks
  Pictures.userVotes++;


  //count votes for each image, if image is selected then add to it's vote total
  for (var i = 0; i < Pictures.allInfo.length; i++) {

    // add to titles array if shown
    titles[i] = Pictures.allInfo[i].name;

    //add views to array if shown
    totalViews[i] = Pictures.allInfo[i].views;

    // if alt tags are equal then increment votes and add to vote total
    if (Pictures.allInfo[i].alt === e.target.alt) {

      Pictures.allInfo[i].votes++;
      totalVotes[i] = Pictures.allInfo[i].votes;
      break;
    }
    // totalVotes[i] = Pictures.allInfo[i].votes;
  }

  // After storing votes and views then render new images for the next vote
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
