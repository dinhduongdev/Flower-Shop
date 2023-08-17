const api = './data/review.json'
let containerRight = document.querySelector(".container__right")
console.log(containerRight);

function loadcomment(api){
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
                                <h4>- ${item.name}</h4>
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


