let load = document.getElementById('loader');
window.addEventListener("load", function () {
  setTimeout(() => {
    load.style.display = "none";
  }, 200);
});

// update status login
(function updatestatus() {
  let status = localStorage.getItem("status")
  if (status == "success") {
    document.querySelector(".header__option--login").style.display = "none";
    document.querySelector(".fa-user").style.display = "block";
    document.querySelector(".fa-cart-shopping").style.display = "block";
  }
})()

let textCart = document.querySelector(".fa-cart-shopping span")
if (textCart){
  textCart.innerHTML = localStorage.getItem("quatilyCart") ? localStorage.getItem("quatilyCart") : "0";
}
/* ========== Navigation =========== */

/* ========== Navigation =========== */
var iconSearch = document.querySelector(".header__optionSearch .icon-search");
var iconClose = document.querySelector(".header__searchbox .icon-close");
var boxSearch = document.querySelector(".header__searchbox");


iconSearch.addEventListener("click", () => {
  boxSearch.classList.add("open");
});
iconClose.addEventListener("click", () => {
  boxSearch.classList.remove("open");
});


const iconMenu = document.querySelector(".header__optionSearch .icon-menu");
const strollMenu = document.querySelector(".header__option");

var check = false;

iconMenu.addEventListener("click", () => {
  if (!check) {
    iconMenu.classList.replace("fa-bars", "fa-x");
    strollMenu.classList.add("stroll");
    check = true;

  } else {
    iconMenu.classList.replace("fa-x", "fa-bars");
    strollMenu.classList.remove("stroll");
    check = false;
  }
});



// go to  cart 
let gotoListCart = document.querySelector(".fa-cart-shopping")
gotoListCart.addEventListener('click', toggleListCart)
function toggleListCart(){
    window.location.href=  './cart.html'
}




