const api = './data/review.json'
let containerRight = document.querySelector(".container__right")
console.log(containerRight);

function loadcomment(api) {
    fetch(api)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            let textCmt = ''
            data.forEach(item => {
                textCmt +=
                    `
                    <div class="card">
                        <img src="${item.image}" alt="user" />
                        <div class="card__content">
                            <span><i class="ri-double-quotes-l"></i></span>
                            <div class="card__details">
                                <h4>${item.name}</h4>
                                <p>
                                    "${item.comment}"
                                </p>

                            </div>
                        </div>
                    </div>
                `
            });
            containerRight.innerHTML = textCmt

        })
}
loadcomment(api)



let valueDisplays = document.querySelectorAll(".number-achievements");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    
    let counter = setInterval(function () {
        if (startValue < endValue) {
            startValue += 1;
            valueDisplay.textContent = startValue + "+";
        } else {
            clearInterval(counter); 
        }
    }, duration);
});
