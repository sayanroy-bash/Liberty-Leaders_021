let speed = 30;
const barContainer = document.getElementById('barContainer');
var sort_button = document.getElementById("sort_button");

let random_array_generate = document.getElementById("random_array_generate")
random_array_generate.addEventListener("click", () => {
    let randomArray = generateRandomArray(13, 100);
    document.getElementById('input_numbers').value = randomArray.join(',');
})

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
        bar.style.width = barWidth + "px"
        bar.innerText = array[i]; // line to display the number inside the bar
        bar.style.color = "white"
        barContainer.appendChild(bar);
    }
}

function updateSpeed() {
    speed = document.getElementById('speed').value;
}

async function mergeSort(arr, start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(arr, start, mid);
        await mergeSort(arr, mid + 1, end);
        await merge(arr, start, mid, end);
    }
}

async function merge(arr, start, mid, end) {
    const leftArray = [];
    const rightArray = [];

    for (let i = start; i <= mid; i++) {
        leftArray.push(arr[i].style.height);
    }
    for (let i = mid + 1; i <= end; i++) {
        rightArray.push(arr[i].style.height);
    }

    let i = 0, j = 0, k = start;
    while (i < leftArray.length && j < rightArray.length) {
        if (parseInt(leftArray[i]) < parseInt(rightArray[j])) {
            arr[k].style.height = leftArray[i];
            arr[k].innerText = parseInt(leftArray[i]); // line to display the correct number
            arr[k].style.backgroundColor = "red";
            i++;
        } else {
            arr[k].style.height = rightArray[j];
            arr[k].innerText = parseInt(rightArray[j]); // line to display the correct number
            arr[k].style.backgroundColor = "red";
            j++;
        }
        k++;
        await new Promise(resolve => setTimeout(resolve, 200 / speed));
    }

    while (i < leftArray.length) {
        arr[k].style.height = leftArray[i];
        arr[k].innerText = parseInt(leftArray[i]); // line to display the correct number
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 200 / speed));
    }

    while (j < rightArray.length) {
        arr[k].style.height = rightArray[j];
        arr[k].innerText = parseInt(rightArray[j]); // line to display the correct number
        arr[k].style.backgroundColor = "red";
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 200 / speed));
    }
    for (let i = start; i <= end; i++) {
        arr[i].style.backgroundColor = "#2fb45d";
    }
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
    await mergeSort(bars, 0, bars.length - 1);
});
