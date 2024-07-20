let speed = 30;
const barContainer = document.getElementById('barContainer');
var sort_button = document.getElementById("sort_button");

let random_array_generate = document.getElementById("random_array_generate");
random_array_generate.addEventListener("click", () => {
    let randomArray = generateRandomArray(13, 100);
    document.getElementById('input_numbers').value = randomArray.join(',');
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

function createBars(array) {
    barContainer.innerHTML = '';
    let barContainerWidth = barContainer.clientWidth;
    let barWidth = (barContainerWidth / array.length) - 2;
    let maxValue = Math.max(...array);
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');

        let barHeightPercent = (array[i] / maxValue) * 100;
        bar.style.height = barHeightPercent + "%";
        bar.style.width = barWidth + "px";
        bar.innerText = array[i]; // line to display the number inside the bar
        bar.style.color = "white";
        barContainer.appendChild(bar);
    }
}

function updateSpeed() {
    speed = document.getElementById('speed').value;
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        arr[i].style.backgroundColor = "blue"; // Highlight the current index
        for (let j = i + 1; j < arr.length; j++) {
            arr[j].style.backgroundColor = "yellow"; // Highlight the current minimum index candidate
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
            if (parseInt(arr[j].innerText) < parseInt(arr[minIndex].innerText)) {
                if (minIndex !== i) {
                    arr[minIndex].style.backgroundColor = "#4CAF50"; // Reset the previous minimum
                }
                minIndex = j;
            }
            arr[j].style.backgroundColor = "#4CAF50"; // Reset after comparison
        }
        if (minIndex !== i) {
            await swap(arr, i, minIndex);
        }
        arr[i].style.backgroundColor = "#2fb45d"; // Mark as sorted
    }
    arr[arr.length - 1].style.backgroundColor = "#2fb45d"; // Mark the last element as sorted
}

async function swap(arr, i, j) {
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    const tempHeight = arr[i].style.height;
    const tempValue = arr[i].innerText;

    arr[i].style.height = arr[j].style.height;
    arr[i].innerText = arr[j].innerText;
    arr[j].style.height = tempHeight;
    arr[j].innerText = tempValue;

    arr[i].style.backgroundColor = "red"; // Indicate the swap
    arr[j].style.backgroundColor = "red"; // Indicate the swap
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    arr[i].style.backgroundColor = "#4CAF50"; // Reset after swap
    arr[j].style.backgroundColor = "#4CAF50"; // Reset after swap
}

sort_button.addEventListener("click", async function () {
    let inputString = document.getElementById('input_numbers').value;
    let numbers = inputString.split(",").map(Number);

    if (!numbers.every(Number.isInteger)) {
        alert("Please enter comma-separated numbers only.");
        return;
    }
    createBars(numbers.slice());
    const bars = Array.from(barContainer.children);
    await selectionSort(bars); // Change this to use selectionSort
});
