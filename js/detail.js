
(function Getdetail() {
    let detail = JSON.parse(localStorage.getItem("detail-product"))
    console.log(detail);
    let text =
        `
        <div class="detail__img">
            <div class="img-thumbnail">

            </div>
            <div class="img-main">
                <img src= ${detail.image[0]} alt="">
            </div>

        </div>
        <div class="detail__info">
            <h3 class="name">${detail.name}</h3>
            <p class="price">${detail.price}$</p>
            <p class="desc">Price include VAT - This product does not support free shipping (Details)</p>
            <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <div class="quantily">
                <button class="btnDecrease">-</button>
                <input class="btn-quantity" type="text" style="width: 30px" value=1>
                <button class="btnIncrease">+</button>

            </div>

            <div class="faster">Đặt hoa nhanh: <span><i class="fa-solid fa-phone"></i>0347163896</span><span><i class="fa-solid fa-phone"></i>0794914351</span></div>
            <div class="pays">Thanh toán: 
                <div class="pays-image">
                    <img src="./images/detail/atm.png" alt=""> 
                    <img src="./images/detail/visa.png"  alt=""> 
                    <img src="./images/detail/mastercard.png"  alt=""> 
                    <img src="./images/detail/JCB.png"  alt=""> 
                </div>
            </div>
            
            <button class="btn btn-detail">add to cart</button>
           
        </div>
    `

    document.querySelector("section.detail").innerHTML = text
    let textThumbnail = ""
    let cc = 0
    for (let i = 0; i < detail.image.length; i++) {
        textThumbnail += `<img src="${detail.image[i]}" onclick="Changeimg(this.src)">`
        cc++;
    }
    let thumbnail = document.querySelector("section.detail .detail__img .img-thumbnail")
    console.log(thumbnail);
    console.log(textThumbnail);
    console.log(cc);

    thumbnail.innerHTML = textThumbnail


})()

function Changeimg(srcImg) {
    document.querySelector(".img-main img").src = srcImg
}



// tăng 
let increaseButtons = document.querySelector('.btnIncrease');
let quatilyText = document.querySelector(".btn-quantity");
let quatily = 1;
increaseButtons.addEventListener('click', () => {
    quatily++;
    quatilyText.value = quatily;
    console.log(quatily);
});

//giảm
let decreaseButtons = document.querySelector('.btnDecrease');
decreaseButtons.addEventListener('click', () => {
    quatily--;
    quatilyText.value = quatily;
    console.log(quatily);
});


let quatilyCart = Number(localStorage.getItem("quatilyCart"))
console.log(quatilyCart);

// add product
function addProduct() {
    let listCart = JSON.parse(localStorage.getItem("listCart")) || []; // Khởi tạo listCart nếu chưa tồn tại
    let detail = JSON.parse(localStorage.getItem("detail-product"));

    let found = false;
    console.log(quatily);

    for (let i = 0; i < listCart.length; i++) {
        console.log(listCart[i].quatily);
        if (listCart[i].product.id === detail.id && listCart[i].product.nature.type === detail.nature.type) {
            listCart[i].quatily += quatily; // Cập nhật số lượng
            found = true;
            break; // Tìm thấy sản phẩm khớp, không cần kiểm tra tiếp
        }
    }

    if (!found) {
        let newproduct = {
            quatily: quatily,
            product: { ...detail }
        }
        console.log(newproduct);
        listCart.push(newproduct); // Thêm sản phẩm mới vào giỏ hàng nếu không tìm thấy khớp
        quatilyCart++;
        localStorage.setItem("quatilyCart", quatilyCart)
        document.querySelector(".fa-cart-shopping span").innerHTML = quatilyCart;
    }

    localStorage.setItem("listCart", JSON.stringify(listCart));
}
// Gọi hàm để thực hiện thêm sản phẩm vào giỏ hàng

let btnDetail = document.querySelector(".btn-detail")
btnDetail.addEventListener('click', () => {
    addProduct()
})


function typeProduct() {
    const natureType = JSON.parse(localStorage.getItem("detail-product")).nature.type;
    let typeProduct;
    let apiProduct;

    if (natureType === "love") {
        typeProduct = "love";
        apiProduct = "./data/love.json";
    } else if (natureType === "birthday") {
        typeProduct = "birthday";
        apiProduct = "./data/birthday.json";
    } else if (natureType === "congratulation") {
        typeProduct = "congratulation";
        apiProduct = "./data/congratulation.json";
    } else {
        typeProduct = "sympathy";
        apiProduct = "./data/sympathy.json";
    }

    return { typeProduct, apiProduct };
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
function detailproduct(item) {
    console.log(item);
    localStorage.setItem('detail-product', '')
    localStorage.setItem('detail-product', JSON.stringify(item))
    window.location.href = './detail.html'
}
function showProduct() {
    let list = document.querySelector('section.connection .list')  // list chứa danh sách các sản phẩm
    const { typeProduct: productType, apiProduct: productApi } = typeProduct();
    console.log(productType, productApi);

    list.innerHTML = ''  // list rỗng
    fetch(productApi)
        .then((response) => response.json())
        .then(data => {
            data.forEach(item => {

                // create card
                let newItem = document.createElement('div');
                newItem.classList.add('card');


                // create image
                let imageCard = new Image();
                imageCard.classList.add("card__img");
                imageCard.addEventListener('click', () => { detailproduct(item) })
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
                newAdd.addEventListener('click', () => addToCard(item.id, data, item.nature.type));
                nodeCart.appendChild(newAdd);

                newItem.appendChild(nodeCart)  // gán cho card
                // gan card cho list
                list.appendChild(newItem);

            });

        })


}

showProduct()