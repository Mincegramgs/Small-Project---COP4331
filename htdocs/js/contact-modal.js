
var modal = document.getElementById("contact-modal");

var openModalBtn = document.getElementById("openSignupModal");


var closeModalBtn = document.getElementsByClassName("close")[0];



openModalBtn.onclick = function() {

    modal.style.display = "block"; 

    setTimeout(function() {

        modal.classList.add("active"); // Add the active class to fade in

    }, 10); // Delay to allow display change to take effect before fading in

}


// Close modal when close button is clicked

closeModalBtn.onclick = function() {

    modal.classList.remove("active"); 

    setTimeout(function() {

        modal.style.display = "none"; // Hide the modal after the fade-out completes

    }, 500); // Delay hiding to allow the fade-out effect to complete (matching transition duration)

}


// Close modal when clicking outside of the modal

window.onclick = function(event) {

    if (event.target == modal) {

        modal.classList.remove("active"); 

        setTimeout(function() {

            modal.style.display = "none"; // Hide the modal after the fade-out completes

        }, 500);

    }

}


