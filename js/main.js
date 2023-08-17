let numberFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' })

// scroll
let scroll = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 200) {
    scroll.style.display = 'block';
  } else {
    scroll.style.display = 'none';
  }
});

function topFunction() {
  document.documentElement.scrollTop = 0;

}


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

document.querySelector(".fa-cart-shopping span").innerHTML = localStorage.getItem("quatilyCart") ? localStorage.getItem("quatilyCart") : "0";
/* ========== Navigation =========== */
document.querySelectorAll(".nav-item ul li a").forEach((item => {

  item.addEventListener('click', () => {

    if (screen.width < 768) {
      location.reload()
    }

  })
}
  
))

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



/* ========== User Form =========== */
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
}
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
}


let refreshInterval = setInterval(() => { next.click() }, 3000);
function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + 'px';
  // 
  let last_active_dot = document.querySelector('.slider .dots li.active');
  last_active_dot.classList.remove('active');
  dots[active].classList.add('active');

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => { next.click() }, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener('click', () => {
    active = key;
    reloadSlider();
  })
})
window.onresize = function (event) {
  reloadSlider();
};


// /* ========== Countdown timer =========== */
// Set the date we're counting down to
var countDownDate = new Date("Aug 25, 2023 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector("#timer .days").innerHTML = days + 'd'
  document.querySelector("#timer .hours").innerHTML = hours + 'h'
  document.querySelector("#timer .minutes").innerHTML = minutes + 'm'
  document.querySelector("#timer .second").innerHTML = seconds + 's'

  //If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);



let quatily = 0
let existingListCart = localStorage.getItem('listCart');
if (!existingListCart) {
  localStorage.setItem('listCart', '[]');
}


function addToCard(id, productFilter, type) {
  let quatilyCart = Number(localStorage.getItem('quatilyCart'))  //số lượng có trong giỏ hàng
  let arrCart = JSON.parse(localStorage.getItem('listCart')) // mảng sản phẩm có trong giỏ hàng

  let flag = false  // biến cờ
  let tmp;
  for (let i = 0; i < productFilter.length; i++) {
    if (productFilter[i].id == id) {
      tmp = productFilter[i];
      quatily = 1;
    }
  }

  // tìm id trùng trong list product đã thêm
  for (let i = 0; i < arrCart.length; i++) {
    if (arrCart[i].product.id == id && arrCart[i].product.nature.type == type) {
      flag = true
      arrCart[i].quatily += 1
    }
  }
  if (flag == false)   // nếu mặt hàng khác nhau thì push là list
  {
    // tạo một product để thêm vào list arrCart
    let item = {
      quatily: quatily,
      product: tmp
    }
    arrCart.push(item)  // add vào
    quatilyCart += 1   // tăng số lượng của  giỏ hàng
  }
  console.log(quatilyCart);

  document.querySelector(".fa-cart-shopping span").innerHTML = quatilyCart;
  localStorage.setItem("listCart", JSON.stringify(arrCart));
  localStorage.setItem("quatilyCart", JSON.stringify(quatilyCart));
}



function showProduct(product, list, count) {
  count.innerText = product.length; // số lượng của Results
  console.log('mang', product);
  list.innerHTML = ''
  product.forEach((item) => {
    // create card
    let newItem = document.createElement('div');
    newItem.classList.add('card');
    newItem.addEventListener('click', () => { detailproduct(item) })

    // create image
    let imageCard = new Image();
    imageCard.classList.add("card__img");
    imageCard.src = item.image[0];
    newItem.appendChild(imageCard); // nối element vào card

    // create name product
    let titleCard = document.createElement('div');  // tạo thẻ
    titleCard.classList.add('card__name');  // thêm class
    titleCard.innerText = item.name;  // gán nội dung

    newItem.appendChild(titleCard);  // nối element vào card

    // create price
    let priceCard = document.createElement('div');  // tạo thẻ
    priceCard.classList.add('card__price'); // thêm class

    priceCard.innerText = item.price.toLocaleString() + '$';   // gán nội dung
    newItem.appendChild(priceCard);   // nối element vào card


    // create evaluate
    let evaluateCard = document.createElement('div');
    evaluateCard.classList.add("card__evaluate");


    // create star
    let newStar = document.createElement('div')
    newStar.classList.add('star'); // thêm class

    newStar.innerHTML =
      `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
    `
    evaluateCard.appendChild(newStar)

    // create review
    let newReview = document.createElement('div')
    newReview.classList.add('review'); // thêm class
    newReview.innerHTML = `${item.review} reviews`   // gán nội dung

    evaluateCard.appendChild(newReview)  // gán nội dung
    newItem.appendChild(evaluateCard)  // gán cho card

    // create nodeCart
    let nodeCart = document.createElement("div")
    nodeCart.classList.add("card__node")

    let newAdd = document.createElement('button');
    newAdd.classList.add('btn');
    newAdd.textContent = 'Add to cart';
    newAdd.addEventListener('click', () => addToCard(item.id, product, item.nature.type));
    nodeCart.appendChild(newAdd);


    // create detail
    let newHeart = document.createElement('i');
    newHeart.classList.add("fa-solid", "fa-heart", "card__heart")
    nodeCart.appendChild(newHeart)




    // create star
    let newDetail = document.createElement('i');
    newDetail.classList.add("fa-solid", "fa-eye", "card__detail")
    newDetail.addEventListener('click', () => { detailproduct(item) })
    nodeCart.appendChild(newDetail)
    newItem.appendChild(nodeCart)  // gán cho card
    // gan card cho list
    list.appendChild(newItem);
  });
}

//handle
function handleFilterSubmit(event, product, list, count) {
  event.preventDefault();  // ngăn chặn hành vi mặc định
  let valueFilter = event.target.elements;
  let productFilter = product.filter(item => {
    if (valueFilter.color.value != '') {
      if (!item.nature.color.includes(valueFilter.color.value)) {
        return false;
      }
    }
    // check name
    if (valueFilter.name.value != '') {
      if (!item.name.includes(valueFilter.name.value)) {
        return false;
      }
    }
    // check min price
    if (valueFilter.minPrice.value != '') {
      if (item.price < valueFilter.minPrice.value) {
        return false;
      }
    }
    //  check max price
    if (valueFilter.maxPrice.value != '') {
      if (item.price > valueFilter.maxPrice.value) {
        return false;
      }
    }
    return true;
  })
  console.log(productFilter);
  showProduct(productFilter, list, count);
}

let apiLove = '../data/love.json' // api products
let listLoveFlower = document.getElementById('list-love-flower');  // list love
//let filter = document.querySelector('.filter');
let countLoveFlower = document.getElementById('count-love-flower');

function GetProducts(api, list, count, filterType) {
  fetch(api)
    .then((response) => response.json())
    .then(data => {
      showProduct(data, list, count)

      filterType.addEventListener('submit', (event) => {
        console.log(data);
        console.log(list);
        console.log(count);
        handleFilterSubmit(event, data, list, count);
      });
      //message
      let btnAdd = document.querySelectorAll('.card__node .btn')
      let message = document.querySelector('.message')

      btnAdd.forEach((item) => {
        item.addEventListener('click', () => {
          message.classList.add('show')
          setTimeout(() => {
            message.classList.remove('show')
            message.classList.add('hide')
          }, 2000)
        })

      })
    })
}
let filterLove = document.querySelector('.filter--love');
GetProducts(apiLove, listLoveFlower, countLoveFlower, filterLove);


let apiBirth = '../data/birthday.json' // api products
let listBirthFlower = document.getElementById('list-birth-flower'); // filter products
let countBirthFlower = document.getElementById('count-birth-flower');
let filterBirth = document.querySelector('.filter--birth');
GetProducts(apiBirth, listBirthFlower, countBirthFlower, filterBirth);


let apiCongratulation = '../data/congratulation.json' // api products
let listCongratulationFlower = document.getElementById('list-congratulation-flower'); // filter products
let countCongratulationFlower = document.getElementById('count-congratulation-flower');
let filterCongratulation = document.querySelector('.filter--congratulation');
GetProducts(apiCongratulation, listCongratulationFlower, countCongratulationFlower, filterCongratulation);



let apiSympathy = '../data/sympathy.json' // api products
let listSympathyFlower = document.getElementById('list-sympathy-flower');// filter products
let countSympathyFlower = document.getElementById('count-sympathy-flower');
let filterSympathy = document.querySelector('.filter--sympathy');
GetProducts(apiSympathy, listSympathyFlower, countSympathyFlower, filterSympathy);





// // filter product

// // call

// // let filterLove = document.querySelector('.filter--love');
// // filterLove.addEventListener('submit', function (event) {
// //   handleFilterSubmit(event, listLoveFlowers, listLoveFlower, countLoveFlower);
// // });

// // let filterBirth = document.querySelector('.filter--birth');
// // filterBirth.addEventListener('submit', function (event) {
// //   handleFilterSubmit(event, listBirthDayFlowers, listBirthFlower, countBirthFlower);
// // });

// // let filterSympathy = document.querySelector('.filter--sympathy');
// // filterSympathy.addEventListener('submit', function (event) {
// //   handleFilterSubmit(event, listSympathyFlowers, listSympathyFlower, countSympathyFlower);
// // });



// go to  cart 
let gotoListCart = document.querySelector(".fa-cart-shopping")
gotoListCart.addEventListener('click', toggleListCart)
function toggleListCart() {
  window.location.href = './cart.html'
}






// // detail
function detailproduct(item) {
  console.log(item);
  localStorage.setItem('detail-product', '')
  localStorage.setItem('detail-product', JSON.stringify(item))
  window.location.href = './detail.html'
}