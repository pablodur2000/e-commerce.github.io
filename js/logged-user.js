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

// Check if variables already exist before declaring them
if (typeof navItemLogin === 'undefined') {
    const navItemLogin = document.querySelectorAll('.li-a');
}

// Use existing token if available, otherwise get it from localStorage
const existingToken = window.token || localStorage.getItem('token');
const decodedPayload = decodeJWT(existingToken);

if (!decodedPayload || !decodedPayload.user_name) {
    navItemLogin[2].innerHTML = "Login";
} else {
    navItemLogin[2].innerHTML = decodedPayload.user_name;
    localStorage.setItem("user_name", decodedPayload.user_name);
    localStorage.setItem("user_id", decodedPayload.user_id);
}