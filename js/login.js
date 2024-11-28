let iconAndInputDiv = document.querySelectorAll('.icon-and-input-div');

iconAndInputDiv.forEach(div => {
    div.addEventListener('click', () => {
        div.style.borderBottom = '1px solid rgb(180, 180, 180)';
    });
});


document.getElementById("login").addEventListener("submit", async function (e) {
    e.preventDefault();//evita que se envie el formulario

    let username = document.getElementById("user").value.trim();
    let password = document.getElementById("password").value.trim();
    
    
    if (username === "" || password === "") {
        alert("Por favor complete los campos correspondientes");
        if(!username){
            iconAndInputDiv[0].style.borderBottom = '3px solid red';
        }
        if(!password){
            iconAndInputDiv[1].style.borderBottom = '3px solid red';
        }
    } 
    else {
        await fetch(`https://e-commerce-server-eight-mu.vercel.app/api/login/${username}/${password}`) 
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json(); // Parsear la respuesta a JSON
        })
        .then(data => {
          console.log(data); // Manejar los datos obtenidos

          if(data.error){
            alert(data.error)
          }else{
            alert("Login exitoso");
            localStorage.setItem("token", data.token);
            window.location.href = "/e-commerce.github.io/index.html";
        }
        })
        .catch(error => {
          console.error('Hubo un problema con la operación de fetch:', error);
        });


        

        
    }
});

    
    