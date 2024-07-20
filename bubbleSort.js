document
.getElementById("array-form")
.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("array-input").value;
  const array = input.split(",").map(Number);
  const speed = document.getElementById("speed-input").value;
  visualizeBubbleSort(array, speed);
});

document
.getElementById("speed-input")
.addEventListener("input", function () {
  const speedLabel = document.querySelector('label[for="speed-input"]');
  speedLabel.textContent = `Animation Speed: ${this.value}ms`;
});

async function visualizeBubbleSort(array, speed) {
const container = document.getElementById("array-container");
container.innerHTML = "";

// Create bars for the array elements
array.forEach((num) => {
  const bar = document.createElement("div");
  bar.className = "bar";
  bar.style.height = `${num * 10}px`;
  bar.textContent = num;
  container.appendChild(bar);
});

// Bubble Sort algorithm with visualization
let bars = document.querySelectorAll(".bar");
for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length - i - 1; j++) {
    bars[j].style.backgroundColor = "rgb(9, 9, 11)";
    bars[j + 1].style.backgroundColor = "rgb(9, 9, 11)";

    if (array[j] > array[j + 1]) {
      await sleep(speed); // Wait for the specified speed
      swap(bars, array, j, j + 1);
    }

    bars[j].style.backgroundColor = "rgb(9, 9, 11)";
    bars[j + 1].style.backgroundColor = "rgb(9, 9, 11)";
  }
  bars[array.length - i - 1].style.backgroundColor = "rgb(9, 9, 11)";
}
}

function swap(bars, array, i, j) {
// Swap the heights of the bars
let tempHeight = bars[i].style.height;
bars[i].style.height = bars[j].style.height;
bars[j].style.height = tempHeight;

// Swap the text content of the bars
let tempText = bars[i].textContent;
bars[i].textContent = bars[j].textContent;
bars[j].textContent = tempText;

// Swap the elements in the array
let temp = array[i];
array[i] = array[j];
array[j] = temp;
}

function sleep(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}