document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const matricula = document.getElementsByName('matricula')[0].value;
    const rfc = document.getElementsByName('rfc')[0].value;

    const data = {
        matricula: matricula,
        rfc: rfc
    };
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            Swal.fire({
                title: 'Error',
                text: data.error || 'No se pudo autenticar el usuario, usuario incorrecto',
                icon: 'error'
            });
        }
    })
    .catch(error => {
        console.error('Error en la petición:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al iniciar sesion',
                icon: 'error'
            });
    });
});