// let userInfo = document.querySelector("#user-info");
// let userData = document.querySelector("#user");
// let links = document.querySelector("#links");

// if (localStorage.getItem("firstName")){
//     links.remove();
//     userInfo.style.display = "flex";
//     userData.innerHTML = localStorage.getItem("firstName");
// }
// let logOutBtn = document.querySelector("#logout");
// logOutBtn.addEventListener("click", function (){
//     localStorage.clear();
//     setTimeout(() => {
//         window.location = "login.html";
//     }, 100)
// });

let userInfo = document.querySelector("#user-info");
let userData = document.querySelector("#user");
let links = document.querySelector("#links");

if (localStorage.getItem("firstName")) {
    if (links) links.remove();
    if (userInfo) userInfo.style.display = "flex";
    if (userData) userData.innerHTML = localStorage.getItem("firstName");
}

let logOutBtn = document.querySelector("#logout");
if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        localStorage.clear();
        setTimeout(() => {
            window.location = "login.html";
        }, 100);
    });
}