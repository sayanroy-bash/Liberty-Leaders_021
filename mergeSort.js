let speed = 50;
const barContainer = document.getElementById('barContainer');

function createBars() {
    const numBars = 20;
    barContainer.innerHTML = '';
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${Math.floor(Math.random() * 100) + 50}px`;
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
            i++;
        } else {
            arr[k].style.height = rightArray[j];
            j++;
        }
        k++;
        await new Promise(resolve => setTimeout(resolve, 200 / speed));
    }

    while (i < leftArray.length) {
        arr[k].style.height = leftArray[i];
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 200 / speed));
    }

    while (j < rightArray.length) {
        arr[k].style.height = rightArray[j];
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 200 / speed));
    }
}

function startSort() {
    const bars = Array.from(barContainer.children);
    mergeSort(bars, 0, bars.length - 1);
}

createBars();
