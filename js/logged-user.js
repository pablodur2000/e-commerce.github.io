const navItemLogin = document.querySelectorAll('.li-a');
const user = localStorage.getItem("user");
if (!user){
    navItemLogin[2].innerHTML = "Login";
}else{
    navItemLogin[2].innerHTML = user;
};