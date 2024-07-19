
const hamburgerBtn = document.querySelector(".hamburger-btn");
const sideBar = document.querySelector(".sidebar-section");
const toggleBtn = document.querySelector(".toggle-btn");

hamburgerBtn.addEventListener("click", ()=>{
    sideBar.style.display = "block";
});

toggleBtn.addEventListener("click", ()=>{
    sideBar.style.display = "none";
});