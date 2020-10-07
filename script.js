
// function readFile(file_path) {
//   var client = new XMLHttpRequest();
//   client.open('GET', file_path);
//   client.onreadystatechange = function() {
//     var text_ = client.responseText;
//     console.log(`0 the text is: ${text_}`);
//   }
//   client.send();
//   return text_;
// }

// console.log(`1 the text is: ${readFile('./p1.txt')}`);

function embedFileInP(elementId, filePath){
  var txtFile = new XMLHttpRequest();
  var allText = "file not found!";
  txtFile.onreadystatechange = function () {
    console.log(txtFile.readyState === XMLHttpRequest.DONE)
    console.log(txtFile.status)

      if (txtFile.readyState === XMLHttpRequest.DONE) {
          
          allText = txtFile.responseText;
          allText = allText.split("\n").join("<br>");
      }

      document.getElementById(elementId).innerHTML = allText;
  }
  txtFile.open("GET", filePath);
  txtFile.send(null);
}

embedFileInP("data1", "./text/data-1.txt");
embedFileInP("data2", "./text/data-2.txt");
embedFileInP("data3", "./text/data-3.txt");

embedFileInP("ML1", "./text/ML-1.txt");



const sections = document.querySelectorAll("section"); // sections objects list
const circles = document.querySelectorAll(".circle");
const navigation_buttons = document.querySelectorAll('.nav-link');
const progress = document.querySelector('.progress h2');

const SECTIONS_NUM = sections.length;
const wheel_activated = false;

let counter = 0; // used to keep track of the section number. equals section-1
let moveRight;

// update progress bar: update number, make every circle transparent and whiten the right one
const progressCounter = (section_number) => { 
  progress.textContent = `${section_number}/${SECTIONS_NUM}`
  Array.from(circles).forEach((circle) => {
    circle.style.backgroundColor = 'transparent';
  });
  document.querySelector(`.circle-${section_number}`).style.backgroundColor = 'white';
}

// change section: move the current section left or the previous section right
function chSection(counter, moveRight, chSec) { 
  const section_number = counter + (moveRight ? 1 : 0)
  console.log(`The section number is: ${section_number}.`);
  console.log(moveRight ? `Rolled down / clicked right.` : `Rolled Up / clicked left.`);
  document.querySelector(`.section-${counter}`).style.left = chSec;
  progressCounter(section_number);
}

// handle wheel movement, if activated
if (wheel_activated) {
  window.addEventListener("wheel", (e)=> {
    moveRight = e.deltaY > 0; // move right == roll down 
    if ((moveRight) & (counter+1 < SECTIONS_NUM)) { // 
      counter++;
      chSection(counter, moveRight, "-100vw")
    } 
    else if ((!moveRight) & (counter+1 >= 2)){ // up
      chSection(counter, moveRight, "0")
      counter--;
    }
  });
}

// handle arrow buttons
document.querySelector(`.left-btn`).addEventListener("click", (e)=> {
  if (counter+1 >= 2){ // 
    chSection(counter, false, "0")
    counter--;
  }
});

document.querySelector(`.right-btn`).addEventListener("click", (e)=> {  
  if (counter+1 < SECTIONS_NUM) { // 
    counter++;
    chSection(counter, true, "-100vw")
  } 
});

// handle navigation buttons
function navigateSection(nav_button, nav_index){
  nav_button.addEventListener("click", (e) => {    
    console.log(`counter: ${counter}, nav_index: ${nav_index}.`)
    
    while (counter > nav_index) {
      chSection(counter, false, "0")
      counter--;
    }

    while (counter < nav_index) {
      counter++;
      chSection(counter, true, "-100vw")
    }
  });
}

let nav_index = 0;
for (nav_index = 0; nav_index < SECTIONS_NUM ; nav_index++){
  navigateSection(navigation_buttons[nav_index], nav_index);
}
navigateSection(document.querySelector(`.logo-link`), 0);


progressCounter(1); // initialize progress bar

