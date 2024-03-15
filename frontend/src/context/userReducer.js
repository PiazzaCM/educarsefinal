import { userTypes } from "./userTypes";

export const userReducer = (state, action) => {

    switch (action.type) {
        case userTypes.login:
            localStorage.setItem('user', JSON.stringify({...action.payload, isLogged: true}))
            return {
                ...action.payload,
                isLogged: true
            }
        case userTypes.logout:
            localStorage.removeItem('user')
            return {
                isLogged: false
            }

        case userTypes.UPDATE_PHOTO:
            localStorage.setItem('user', JSON.stringify({...state, imagen: action.payload.imagen, imagenId: action.payload.imagenId}));
            return {
                ...state,
                imagen: action.payload.imagen,
                imagenId: action.payload.imagenId
            }

        case userTypes.UPDATE_COLOR:
            localStorage.setItem('user', JSON.stringify({...state, portadaColor: action.payload}));
            return {
                ...state,
                portadaColor: action.payload
            }
        default:
            return {
                ...state
            }
    }
}