
const stackContainer = document.getElementById("stackContainer");
      const stackStatus = document.getElementById("stackStatus");
      let stack = [];

      function push() {
        const value = document.getElementById("stackInput").value;
        if (value === "") {
          alert("Please enter a value to push");
          return;
        }
        stack.push(value);
        document.getElementById("stackInput").value = "";
        renderStack();
        updateStatus();
      }

      function pop() {
        if (stack.length === 0) {
          alert("Stack is empty");
          return;
        }
        const poppedElement = document.querySelector(".stack-element");
        poppedElement.classList.add("pop");
        setTimeout(() => {
          stack.pop();
          renderStack();
          updateStatus();
        }, 300); // Duration of pop animation
      }

      function renderStack() {
        stackContainer.innerHTML = "";
        for (let i = 0; i < stack.length; i++) {
          const stackElement = document.createElement("div");
          stackElement.classList.add("stack-element", "push");
          stackElement.textContent = stack[i];
          stackContainer.appendChild(stackElement);
          // Remove the 'push' class after animation completes
          setTimeout(() => {
            stackElement.classList.remove("push");
          }, 300); // Duration of push animation
        }
      }

      function updateStatus() {
        stackStatus.textContent = `isEmpty: ${stack.length === 0}`;
      }