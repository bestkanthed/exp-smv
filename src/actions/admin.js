import axios from 'axios';

export function postUserProfile (formData) {
    return {
        type: 'POST_USER_PROFILE',
        payload: axios('http://localhost:1169/admin/users', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function fetchUserProfile (idUser) {
    return {
        type: 'FETCH_USER_PROFILE',
        payload: axios.get('http://localhost:1169/admin/users/'+idUser, {withCredentials: true})
    }
}

export function updateUserProfile (idUser, formData) {
    return {
        type: 'UPDATE_USER_PROFILE',
        payload: axios('http://localhost:1169/admin/users'+idUser, {
            method: 'put',
            data: formData,
            withCredentials: true
        })
    }
}

export function deleteUserProfile (idUser) {
    return {
        type: 'DELETE_USER_PROFILE',
        payload: axios.delete('http://localhost:1169/admin/users/'+idUser, {withCredentials: true})
    }
}

export function fetchTeams () {
    return {
        type: 'FETCH_TEAMS',
        payload: axios.get('http://localhost:1169/admin/teams', {withCredentials: true})
    }
}