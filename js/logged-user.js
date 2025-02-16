function decodeJWT(token) {
    if (!token) return null;
    
    const parts = token.split('.');
    
    if (parts.length !== 3) {
        return null;
    }
  
    try {
        const payload = parts[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

const navItemLogin = document.querySelectorAll('.li-a');
const token = localStorage.getItem('token');
const decodedPayload = decodeJWT(token);

if (!decodedPayload || !decodedPayload.user_name) {
    navItemLogin[2].innerHTML = "Login";
} else {
    navItemLogin[2].innerHTML = decodedPayload.user_name;
    localStorage.setItem("user_name", decodedPayload.user_name);
    localStorage.setItem("user_id", decodedPayload.user_id);
}