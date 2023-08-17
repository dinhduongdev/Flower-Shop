

// con mắt ẩn  hiện
const eyeShows = document.querySelectorAll(".fa-eye");
eyeShows.forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-eye')) {
      event.target.classList.remove('fa-eye')
      event.target.classList.add('fa-eye-slash')
      let passwordInput = event.target.parentElement.querySelector('input')
      passwordInput.type = 'text'
    } else {
      event.target.classList.add('fa-eye')
      event.target.classList.remove('fa-eye-slash')
      let passwordInput = event.target.parentElement.querySelector('input')
      passwordInput.type = 'password'
    }
  });
});


let btnLogin = document.querySelector('.form__btn')



btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value  

  let emailLocal = localStorage.getItem('email')
  let passwordLocal = localStorage.getItem('password')
  console.log(emailLocal, passwordLocal);

  if (email == emailLocal && password == passwordLocal) {

    window.location.href = './home.html';
    // let groupBtnLogin = document.querySelector('header__option--login')
    // groupBtnLogin.setAttribute("display","none");
    localStorage.setItem("status", 'success');
  } else {
    localStorage.setItem("status", 'fail');
  }
})



