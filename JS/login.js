let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign-in");


let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", function(e){
    e.preventDefault();
    
    
    if (email.value === "" || password.value === "") {
        alert("Please fill in data");
    } else {
        
        if (getEmail && getEmail.trim() === email.value && getPassword && getPassword.trim() === password.value) {
            setTimeout(() => {
                window.location = "index.html"; 
            }, 100);
        } else {
            alert("Email or password is wrong");
        }
    }
});
