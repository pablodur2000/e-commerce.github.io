document.addEventListener("DOMContentLoaded", function () {
    const profilePhoto = document.getElementById("profilePhoto");
    const fileInput = document.getElementById("fileInput"); 
    const uploadBtn = document.getElementById("uploadPhoto");

    
    function loadProfilePhoto() {
        const savedImage = localStorage.getItem("profileImage"); 
        if (savedImage) {
            profilePhoto.src = savedImage;
        }
    }


    function handlePhotoUpload() {
        const file = fileInput.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64Image = e.target.result; 
                localStorage.setItem("profileImage", base64Image);
                profilePhoto.src = base64Image;
            };
            reader.readAsDataURL(file);
        }
    }


    loadProfilePhoto();

    uploadBtn.addEventListener("click", handlePhotoUpload);
});
