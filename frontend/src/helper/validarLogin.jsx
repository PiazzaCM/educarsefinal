import { Toast } from "../components/Toast"

export const validarLogin = (form) => {
    
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
    
        return true

    }
