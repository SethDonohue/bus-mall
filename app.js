'use strict';


//=========================Variables accessable by everything (GLOBAL and Attatched to Objects)=========================

// ++++++++++++++++++++++++++++++++++++++++ -----1-----*** This is purely for my thoguth process to keep track of the order I built
//Array to store All Objects  things
Pictures.allInfo = [];
//Keep track of user click left
Pictures.userClicksLeft = 25;
//track previously deisplayed images
Pictures.lastImages = [];

// ++++++++++++++++++++++++++++++++++++++++ -----4------
// refer to imgs from HTML
var oneEl = document.getElementById('one');
var twoEl = document.getElementById('two');
var threeEl = document.getElementById('three');

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
}

//=========================INSTANCES / NEW OBJECTS=========================

// ++++++++++++++++++++++++++++++++++++++++ -----3------
//make new Image instances/ objects
new Pictures ('bag', 'img/bag.jpg','bag');
new Pictures ('banana', 'img/banana.jpg','banana');
new Pictures ('bathroom', 'img/bathroom.jpg','bathroom');
new Pictures ('boots', 'img/boots.jpg','boots');
new Pictures ('breakfast', 'img/breakfast.jpg','breakfast');
new Pictures ('bubblegum', 'img/bubblegum.jpg','bubblegum');
new Pictures ('chair', 'img/chair.jpg','chair');
new Pictures ('cthulhu', 'img/cthulhu.jpg','cthulhu');
new Pictures ('dog duck', 'img/dog-duck.jpg','dogduck');
new Pictures ('dragon', 'img/dragon.jpg','dragon');
new Pictures ('pen', 'img/pen.jpg','pen');
new Pictures ('pet sweep', 'img/pet-sweep.jpg','petsweep');
new Pictures ('scissors', 'img/scissors.jpg','scissors');
new Pictures ('shark', 'img/shark.jpg','shark');
new Pictures ('sweep', 'img/sweep.png','sweep');
new Pictures ('tauntaun', 'img/tauntaun.jpg','tauntaun');
new Pictures ('unicorn', 'img/unicorn.jpg','unicorn');
new Pictures ('usb', 'img/usb.gif','usb');
new Pictures ('water can', 'img/water-can.jpg','watercan');
new Pictures ('wine glass', 'img/wine-glass.jpg','wineglass');


//=========================FUNCTIONS=========================

// ++++++++++++++++++++++++++++++++++++++++ -----5------
//funcTion to randomly display an Image
Pictures.randomImage = function () {
  //generate random indexes/indices
  var randomOne =  (Math.floor(Math.random() * Pictures.allInfo.length));
  var randomTwo =  (Math.floor(Math.random() * Pictures.allInfo.length));
  var randomThree =  (Math.floor(Math.random() * Pictures.allInfo.length));

  // ++++++++++++++++++++++++++++++++++++++++ -----6------
  //make sure each image was not used in last sequence! If they are randomize them again
  while (Pictures.lastImages.includes(randomOne) || Pictures.lastImages.includes(randomTwo) ||  Pictures.lastImages.includes(randomThree)) {
    console.log(' Picture used last turn!');
    randomOne = (Math.floor(Math.random() * Pictures.allInfo.length));
    randomTwo = (Math.floor(Math.random() * Pictures.allInfo.length));
    randomThree = (Math.floor(Math.random() * Pictures.allInfo.length));
  }

  // ++++++++++++++++++++++++++++++++++++++++ -----7------
  // make sure the random images on current view are not equal to each other!!! If they are randomize them again
  while (randomOne === randomTwo || randomOne === randomThree || randomTwo === randomThree) {
    console.log(' Current pictures are equal to each other! Redraw to remove duplicates!!! ');
    randomOne = (Math.floor(Math.random() * Pictures.allInfo.length));
    randomTwo = (Math.floor(Math.random() * Pictures.allInfo.length));
    randomThree = (Math.floor(Math.random() * Pictures.allInfo.length));
  }

  // ++++++++++++++++++++++++++++++++++++++++ -----8------
  // Update Source for each image
  oneEl.src = Pictures.allInfo[randomOne].filePath;
  twoEl.src = Pictures.allInfo[randomTwo].filePath;
  threeEl.src = Pictures.allInfo[randomThree].filePath;

  //update Alt for each image
  oneEl.alt = Pictures.allInfo[randomOne].altName;
  twoEl.alt = Pictures.allInfo[randomTwo].altName;
  threeEl.alt = Pictures.allInfo[randomThree].altName;

  // ++++++++++++++++++++++++++++++++++++++++ -----9------
  // INCREMENT the views on these images
  Pictures.allInfo[randomOne].views++;
  Pictures.allInfo[randomTwo].views++;
  Pictures.allInfo[randomThree].views++;

  // ++++++++++++++++++++++++++++++++++++++++ -----10------
  // KEEP TRACK of these images / add to lastImages, array methods OR overwrite array
  Pictures.lastImages[0] = randomOne;
  Pictures.lastImages[1] = randomTwo;
  Pictures.lastImages[2] = randomThree;
};

Pictures.showResults = function () {
  for (var i = 0; i < Pictures.allInfo.length; i++) {
    //get total views and votes for an elements
    var views = Pictures.allInfo[i].views;
    var votes = Pictures.allInfo[i].votes;
    console.log(Pictures.allInfo[i].views);
    console.log(Pictures.allInfo[i].votes);

    //put views onto screen?
    // create li element
    var ulEl = document.getElementById('results');
    var liEl = document.createElement('li');

    //add conent to li
    console.log('liEl: ',liEl);
    liEl.textContent = Pictures.allInfo[i].name.toUpperCase() + ' has ' + views + ' views and ' + votes + ' votes.';

    //append li onto ul, what UL?
    ulEl.appendChild(liEl);
  }
};

//=========================EVENT HANLDER=========================
Pictures.onClick = function(e) {
  //input validation

  //kick out if we hit maximum clicks, stop event listener
  if(Pictures.userClicksLeft < 1) {
    console.log('out of votes');
    //stop event listener
    oneEl.removeEventListener('click',Pictures.onClick);
    twoEl.removeEventListener('click',Pictures.onClick);
    threeEl.removeEventListener('click',Pictures.onClick);
    //SHOW RESULTS, function to show resultsList
    Pictures.showResults();
  }

  //INCREMENT total clicks
  Pictures.userClicksLeft--;
  //render new images , use existing function
  Pictures.randomImage();

  //count votes for each image, if image is selected then add to it's vote total
  for (var i = 0; i < Pictures.allInfo.length; i++) {
    console.log('Picture altName', Pictures.allInfo[i].altName);
    console.log('Target alt', e.target.alt);
    if (Pictures.allInfo[i].altName === e.target.alt) {
      console.log('!!!! VOTE COUNTED !!!');
      Pictures.allInfo[i].votes++;
      return;
    }
  }


};


//=========================FUNCTIONAL CODE ON PAGE LOAD=========================

//Event Listner to wait for CLICK on Images
// ++++++++++++++++++++++++++++++++++++++++ -----12------
oneEl.addEventListener('click', Pictures.onClick);
twoEl.addEventListener('click', Pictures.onClick);
threeEl.addEventListener('click', Pictures.onClick);

// ++++++++++++++++++++++++++++++++++++++++ -----11------
// Call random Image on page load!
Pictures.randomImage();
