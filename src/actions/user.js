import axios from 'axios';

/**
 * Dummy payload to be replaced with axios request.
 */
export function fetchUser () {
    return {
        type: 'FETCH_USER_FULLFILLED',
        payload: {
            email: 'abhishek@stampmyvisa.com'
        }
    }
}

/**
 * Only send status 200 to axios with the message

export function loginUser (dispatch, credentials) {
    dispatch({
        type: 'LOGIN_USER',
        payload: axios.post('/login', credentials)
    });
    
    axios.post('/login', credentials).then(response => {
        if (!response.data.error) return document.location.href = '/';
        else {
        console.log("Logging response from the same server", response.data);
        dispatch({
            type : 'SET_FLASH_MESSAGE',
            payload: {
            messageType: 'error',
            message: response.data.error
            }
        });
        showPopupFrame(dispatch, 'flash');
        }
      }).catch(err => {
        console.log('Got an error in calling things', err);
        dispatch({
          type : 'SET_FLASH_MESSAGE',
          payload: {
            messageType: 'error',
            message: err
          }
        });
        showPopupFrame(dispatch, 'flash');
      });
}
 */