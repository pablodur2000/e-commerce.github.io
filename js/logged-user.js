function decodeJWT(token) {
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token');
    }
  
    const payload = parts[1]; // La segunda parte contiene el payload (datos)
    const decodedPayload = atob(payload); // Decodifica Base64Url a texto
    return JSON.parse(decodedPayload); // Parsea el texto JSON
  }

const navItemLogin = document.querySelectorAll('.li-a');

const decodedPayload = decodeJWT(token);

if (!decodedPayload.user_name){
    navItemLogin[2].innerHTML = "Login";
}else{
    navItemLogin[2].innerHTML = decodedPayload.user_name;
    localStorage.setItem("user_name", decodedPayload.user_name);
    localStorage.setItem("user_id", decodedPayload.user_id);
};