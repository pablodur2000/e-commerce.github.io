document.getElementById("login").addEventListener("submit", function (checklogin) {
    let nusuario = document.getElementById("user").value.trim();
    let passw = document.getElementById("password").value.trim();
    
    if (nusuario === "" || passw === "") {
        alert("Por favor complete los campos correspondientes")
        Event.preventDefault(); // evita que se envie el formulario
    } 
    if (nusuario === "usuario" && passw === "contraseña") {
        alert("login exitoso");  
    } else {
        alert("Nombre de usuario o contraseña incorrectos")
    }
    })
    
    