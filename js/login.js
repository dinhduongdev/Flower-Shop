

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





const email = document.getElementById('email')
const password = document.getElementById('password')
const input = document.querySelectorAll('input')
let arrEmpty = []

// Biến để theo dõi trạng thái của các điều kiện
let allConditionsMet = false;
function Checksubmit() {
  allConditionsMet = true;     // Đặt biến về true để bắt đầu kiểm tra
  input.forEach((item) => {  // kiểm tra giá trị các ô input có ô nào trống hay không
    if (item.value === '') {
      let kq = item.parentElement // nếu ô nào trống thì lấy ra cái thẻ cha
      arrEmpty = [...arrEmpty, kq] // bỏ thẻ cha đó vào mảng
      allConditionsMet = false;  // Nếu có một điều kiện không đúng, đặt biến về false
    }
  })
  console.log(arrEmpty);
  arrEmpty.forEach((item) => {   // duyệt cái mảng đó
    let parentElement = item.parentElement
    let error = parentElement.querySelector('p')  // tìm thẻ p để hiên error
    error.style.visibility = 'visible'   // css cho lỗi hiện lên

  })
  arrEmpty.forEach((item) => {    // duyêt ra khi cái nào gõ vào thì ẩn lỗi đi
    console.log(item);
    item.addEventListener('keyup', (e) => {
      let parentElement = item.parentElement
      let error = parentElement.querySelector('p')
      error.style.visibility = 'hidden'

    })
  })

  arrEmpty = []  // reset lại mảng rỗng   
}

// btnLogin.addEventListener('click', (e) => {
//   e.preventDefault()  // ngăn chặn hành vi mặc định
//   Checksubmit()// Kiểm tra tất cả các điều kiện

// })

function isValidEmail(email) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Lắng nghe sự kiện khi người dùng rời khỏi trường email
document.getElementById('email').addEventListener('blur', function () {
  const emailInput = this.value;
  const emailError = document.getElementById('email-error');
  console.log(emailError);

  if (emailInput === '') {
    emailError.innerHTML = 'Email address field cannot be left blank';
    emailError.style.visibility = 'visible'
  } else if (!isValidEmail(emailInput)) {
    emailError.innerHTML = 'Please enter a valid email address';
    emailError.style.visibility = 'visible'
    document.getElementById('email').classList.remove('success')
  } else {
    emailError.innerHTML = '';
    document.getElementById('email').classList.add('success')
  }
});


function isValidPassword(password) {
  // Kiểm tra xem mật khẩu có ít nhất 8 ký tự
  return password.length >= 8;
}

// Lắng nghe sự kiện khi người dùng rời khỏi trường mật khẩu
document.getElementById('password').addEventListener('blur', function () {
  const passwordInput = this.value;
  const passwordError = document.getElementById('password-error');

  if (passwordInput === '') {
    passwordError.innerHTML = 'Password field cannot be left blank';
    passwordError.style.visibility = 'visible'
  } else if (!isValidPassword(passwordInput)) {
    passwordError.innerHTML = 'Password must be at least 8 characters long';
    passwordError.style.visibility = 'visible'
  } else {
    passwordError.innerHTML = '';
    document.getElementById('password').classList.add('success')
  }
});


btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

  let email = document.getElementById('email').value
  let password = document.getElementById('password').value

  let emailLocal = localStorage.getItem('email')
  let passwordLocal = localStorage.getItem('password')
  console.log(emailLocal, passwordLocal);
  console.log(email, password);

  Checksubmit()// Kiểm tra tất cả các điều kiện
  if (email == emailLocal && password == passwordLocal) {

    window.location.href = './home.html';
    // let groupBtnLogin = document.querySelector('header__option--login')
    // groupBtnLogin.setAttribute("display","none");
    localStorage.setItem("status", 'success');
  } else {
    localStorage.setItem("status", 'fail');
    confirm("Login failed")
  }
})

