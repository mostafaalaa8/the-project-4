let firstName = document.querySelector("#firstname");
let lastName = document.querySelector("#lastname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let registerBtn = document.querySelector("#sign-up");

registerBtn.addEventListener("click", function(e){
    e.preventDefault();
    

    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "") {
        alert("Please fill all data");
    } else {
        
        localStorage.setItem("firstName", firstName.value);
        localStorage.setItem("lastName", lastName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);

        
        setTimeout(() => {
            window.location = "login.html";
        }, 100);
    }
});