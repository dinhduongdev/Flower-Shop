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


const fullName = document.getElementById('fullname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const cpassword = document.getElementById('cpassword')
const btnSignup = document.getElementById('btn-signup')
const input = document.querySelectorAll('input')
const error = document.querySelectorAll('.error')
    localStorage.setItem("correct-password", "")
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
    let correctPassword = localStorage.getItem("correct-password")
    console.log(correctPassword);
    if ( correctPassword === "correct"){
        allConditionsMet = true;
    }else{
        allConditionsMet = false;
    }
    arrEmpty = []  // reset lại mảng rỗng   
}

btnSignup.addEventListener('click', (e) => {
    e.preventDefault()  // ngăn chặn hành vi mặc định
    Checksubmit()// Kiểm tra tất cả các điều kiện

    if (allConditionsMet) { // Nếu tất cả các điều kiện đều đúng, thực hiện tạo tài khoản
        Createaccount();
    }
})

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

// Lắng nghe sự kiện khi người dùng rời khỏi trường xác nhận mật khẩu
document.getElementById('cpassword').addEventListener('blur', function () {
    const passwordInput = document.getElementById('password').value;
    const cpasswordInput = this.value;
    const cpasswordError = document.getElementById('cpassword-error');


    if (cpasswordInput === '') {
        cpasswordError.innerHTML = 'Confirm password field cannot be left blank';
        cpasswordError.style.visibility = 'visible'
    } else if (passwordInput !== cpasswordInput) {
        cpasswordError.innerHTML = 'Passwords do not match';
        cpasswordError.style.visibility = 'visible'
        document.getElementById('cpassword').classList.remove('success')
        localStorage.setItem("correct-password", "wrong")
    } else {
        cpasswordError.innerHTML = '';
        document.getElementById('cpassword').classList.add('success')
        localStorage.setItem("correct-password", "correct")
    }
});
const modalOverlay = document.querySelector('.modal-overlay');
const closeNotifi = document.querySelector(".modal-overlay .modal .close .fa-x");
closeNotifi.addEventListener('click', () => {
    modalOverlay.style.opacity = '0'; // làm mờ nó đi

    modalOverlay.classList.remove('show');
    modalOverlay.classList.add('hidden'); // thêm class hidden để ẩn đi

});

// đi đến trang login để đăng nhập
const gotoLogin = document.querySelector('.modal-overlay .modal .btn')
gotoLogin.addEventListener('click', () => {
    window.location.href = './login.html'
})
function Checksuccess() {
    let result = JSON.parse(localStorage.getItem('status-create'))
    console.log(result);
    if (result === true) {
        modalOverlay.classList.add('show'); // thêm class show để ẩn đi
    }
}

function Createaccount() {
    let nameStorage = fullName.value
    let emailStorage = email.value
    let passwordStorage = password.value
    // let cpasswordStorage = cpassword.value
    console.log(nameStorage, emailStorage, passwordStorage);
    localStorage.setItem("fullname", nameStorage)
    localStorage.setItem("email", emailStorage)
    localStorage.setItem("password", passwordStorage)
    localStorage.setItem("status-create", true)
    Checksuccess();
}


