

let speed = 5;
const barContainer = document.getElementById("barContainer");
const searchButton = document.getElementById("search_button");
const userInputButton = document.getElementById("user_input_generate");
document
  .getElementById("random_array_generate")
  .addEventListener("click", () => {
    let randomArray = generateRandomArray(20, 100).sort((a, b) => a - b); // Sort the array for binary search
    document.getElementById("input_numbers").value = randomArray.join(",");
    createCircles(randomArray);
  });

userInputButton.addEventListener("click", () => {
  let userInput = document.getElementById("user_input_numbers").value;
  let numbers = userInput
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);

  if (!numbers.every(Number.isInteger)) {
    alert("Please enter valid comma-separated numbers.");
    return;
  }

  document.getElementById("input_numbers").value = numbers.join(",");
  createCircles(numbers);
});

function generateRandomArray(size, max) {
  let arr = [];
  while (arr.length < size) {
    let num = Math.floor(Math.random() * max) + 1;
    if (!arr.includes(num) && num > 5) {
      arr.push(num);
    }
  }
  return arr;
}

function createCircles(array) {
  barContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.innerText = array[i]; // Display the number inside the circle
    barContainer.appendChild(circle);
  }
}

function updateSpeed() {
  speed = document.getElementById("speed").value;
}

async function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    arr[mid].style.backgroundColor = "blue"; // Highlight mid
    await new Promise((resolve) => setTimeout(resolve, 1000 / speed));

    const midValue = parseInt(arr[mid].innerText);
    if (midValue === target) {
      arr[mid].style.backgroundColor = "green"; // Target found
      alert(`Element found index ${mid}`);
      return mid;
    } else if (midValue < target) {
      for (let i = start; i <= mid; i++) {
        arr[i].style.backgroundColor = "red"; // Mark the eliminated range
      }
      start = mid + 1;
    } else {
      for (let i = mid; i <= end; i++) {
        arr[i].style.backgroundColor = "red"; // Mark the eliminated range
      }
      end = mid - 1;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 / speed));
  }
  alert("Element not found");
  return -1; // Target not found
}

searchButton.addEventListener("click", async function () {
  let inputString = document.getElementById("input_numbers").value;
  let numbers = inputString.split(",").map(Number);

  let searchValue = parseInt(document.getElementById("search_value").value);
  if (!numbers.every(Number.isInteger) || isNaN(searchValue)) {
    alert("Please enter valid numbers.");
    return;
  }

  const bars = Array.from(barContainer.children);
  await binarySearch(bars, searchValue);
});

document.getElementById("speed").addEventListener("input", updateSpeed);