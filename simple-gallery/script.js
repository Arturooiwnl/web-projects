let currentImageIndex = 0;
const images = document.querySelectorAll('.thumbnails img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');

function openModal(index) {
    modal.style.display = "block";
    currentImageIndex = index;
    updateModalImage();
}

function closeModal() {
    modal.style.display = "none";
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    updateModalImage();
}

function updateModalImage() {
    modalImg.src = images[currentImageIndex].src;
    modalImg.alt = images[currentImageIndex].alt;
}

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (modal.style.display === "block") {
        if (e.key === "ArrowLeft") {
            changeImage(-1);
        }
        else if (e.key === "ArrowRight") {
            changeImage(1);
        }
        else if (e.key === "Escape") {
            closeModal();
        }
    }
});

