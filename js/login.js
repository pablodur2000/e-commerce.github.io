let iconAndInputDiv = document.querySelectorAll('.icon-and-input-div');

iconAndInputDiv.forEach(div => {
    div.addEventListener('click', () => {
        div.style.borderBottom = '1px solid rgb(180, 180, 180)';
    });
});


document.getElementById("login").addEventListener("submit", function (e) {
    e.preventDefault();//evita que se envie el formulario

    let usuario = document.getElementById("user").value.trim();
    let passw = document.getElementById("password").value.trim();
    
    
    if (usuario === "" || passw === "") {
        alert("Por favor complete los campos correspondientes");
        if(!usuario){
            iconAndInputDiv[0].style.borderBottom = '3px solid red';
        }
        if(!passw){
            iconAndInputDiv[1].style.borderBottom = '3px solid red';
        }
    } 
    else {
        alert("Login exitoso");
        localStorage.setItem("token", 123456);
        window.location.href = "index.html";
    }
});

    
    