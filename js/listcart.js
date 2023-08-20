(function loadData() {
    let data = JSON.parse(localStorage.getItem('listCart'));
    let quantily = JSON.parse(localStorage.getItem('quatilyCart'));
    document.querySelector(".fa-cart-shopping span").innerHTML  = quantily;
    let text =
        `
          <tr>
            <th colspan = "2">Product(s)</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
      `;
    let sumMoney = 0;
    let sumQuantity = 0;
    
    data.forEach((item, index) => {
        text +=
            `
            <tr data-id="${index}">
                <td>
                    <img class="image" src="${item.product.image[0]}"/>
                </td>
                <td>${item.product.name}</td>
                <td>
                        <button class="btnDecrease">-</button>
                        <input type="text" value="${item.quatily}">
                        <button class="btnIncrease">+</button>
                </td>
                <td class = "price">${item.product.price}$</td>
                <td>
                    <button class="btnDelete">Delete</button>
                </td>
            </tr>
      `;
        sumMoney += item.quatily * item.product.price;
        sumQuantity += item.quatily
    });

    text +=
        ` 
          <tr>
              <th colspan="2">Total</th>
              <th>${sumQuantity}</th>
              <th colspan="2" class = "price">${sumMoney.toFixed(2)} $</th>
          </tr>
      `;

    let textTable = document.querySelector('table').innerHTML = text;

    // Xoá khi click vào button
    let deleteButtons = document.querySelectorAll('.btnDelete');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let row = btn.closest('tr');  // lấy tổ tiên gần nhất
            let index = parseInt(row.dataset.id); // lấy dataset
            data.splice(index, 1); // phương thức splice để xoá
            quantily--;

            localStorage.setItem('listCart', JSON.stringify(data));  // cập nhật lại local localStorage
            localStorage.setItem('quatilyCart', JSON.stringify(quantily));  // cập nhật lại local localStorage
            loadData(); // cập nhật lại dữ liệu
        });
    });


    let increaseButtons = document.querySelectorAll('.btnIncrease');
    increaseButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let row = btn.closest('tr');
            let index = row.dataset.id;
            data[index].quatily++;
            // quantily++;
            localStorage.setItem('listCart', JSON.stringify(data));
            // localStorage.setItem('quatilyCart', JSON.stringify(quantily));
            loadData();
        });
    });

    let decreaseButtons = document.querySelectorAll('.btnDecrease');
    decreaseButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let row = btn.closest('tr');
            let index = row.dataset.id;
            data[index].quatily--;
            // quantily--;

            if (data[index].quatily <= 0) {
                data.splice(index, 1);
                quantily--
            }
            localStorage.setItem('listCart', JSON.stringify(data));
            localStorage.setItem('quatilyCart', JSON.stringify(quantily));
            loadData();
        });
    });
})()
