document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
   Swal.fire({
                icon: 'success',
                title: 'Terima Kasih!',
                text: 'Pesan Anda berhasil dikirim!',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
        // Redirect to the home page after showing the success message
        window.location.href = 'index.html';
    });

    document.getElementById('contact-form').reset();
});

