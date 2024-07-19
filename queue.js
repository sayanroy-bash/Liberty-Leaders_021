const queueContainer = document.getElementById("queueContainer");
      const queueStatus = document.getElementById("queueStatus");
      let queue = [];

      function enqueue() {
        const value = document.getElementById("queueInput").value;
        if (value === "") {
          alert("Please enter a value to enqueue");
          return;
        }
        queue.push(value);
        document.getElementById("queueInput").value = "";
        renderQueue();
        updateStatus();
      }

      function dequeue() {
        if (queue.length === 0) {
          alert("Queue is empty");
          return;
        }
        const dequeuedElement = document.querySelector(".queue-element");
        dequeuedElement.classList.add("dequeue");
        setTimeout(() => {
          queue.shift();
          renderQueue();
          updateStatus();
        }, 300); // Duration of dequeue animation
      }

      function renderQueue() {
        queueContainer.innerHTML = "";
        for (let i = 0; i < queue.length; i++) {
          const queueElement = document.createElement("div");
          queueElement.classList.add("queue-element", "enqueue");
          queueElement.textContent = queue[i];
          queueContainer.appendChild(queueElement);
          // Remove the 'enqueue' class after animation completes
          setTimeout(() => {
            queueElement.classList.remove("enqueue");
          }, 300); // Duration of enqueue animation
        }
      }

      function updateStatus() {
        queueStatus.textContent = `isEmpty: ${queue.length === 0}`;
      }