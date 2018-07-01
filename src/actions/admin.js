import axios from 'axios';

export function postUserProfile (formData) {
    return {
        type: 'POST_USER_PROFILE',
        payload: axios('/api/admin/users', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function fetchUserProfile (idUser) {
    return {
        type: 'FETCH_USER_PROFILE',
        payload: axios.get('/api/admin/users/'+idUser, {withCredentials: true})
    }
}

export function updateUserProfile (idUser, formData) {
    return {
        type: 'UPDATE_USER_PROFILE',
        payload: axios('/api/admin/users/'+idUser, {
            method: 'put',
            data: formData,
            withCredentials: true
        })
    }
}

export function deleteUserProfile (idUser) {
    return {
        type: 'DELETE_USER_PROFILE',
        payload: axios.delete('/api/admin/users/'+idUser, {withCredentials: true})
    }
}

export function fetchTeams () {
    return {
        type: 'FETCH_TEAMS',
        payload: axios.get('/api/admin/teams', {withCredentials: true})
    }
}