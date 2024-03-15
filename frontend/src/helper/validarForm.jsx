import { Toast } from "../components/Toast"

export const validarForm = (form) => {

    if (form.name === '') {
        Toast.fire({
            icon: 'error',
            title: 'Ingrese un nombre'
        })

        return false
    }

    if (form.surname === '') {
        Toast.fire({
            icon: 'error',
            title: 'Ingrese un apellido'
        })

        return false
    }

    if (form.email === '') {
        Toast.fire({
            icon: 'error',
            title: 'Ingrese un correo'
        })

        return false
    }

    if (form.password === '') {
        Toast.fire({
            icon: 'error',
            title: 'Ingrese una contraseña'
        })

        return false
    }
    if (form.confirmPassword === '') {
        Toast.fire({
            icon: 'error',
            title: 'Confirme su contraseña'
        })

        return false
    }

    if (form.password !== form.confirmPassword) {
        Toast.fire({
            icon: 'error',
            title: 'Las contraseñas no coinciden'
        })

        return false
    }


    if (form.typeUserId === 0) {
        Toast.fire({
            icon: 'error',
            title: 'Seleccione un tipo de usuario'
        })

        return false
    }

    return true
}