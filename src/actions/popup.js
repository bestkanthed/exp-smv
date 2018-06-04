export function loadPopup (content) {
    return {
        type: 'LOAD_POPUP',
        payload: content
    }
}

export function hidePopupStart () {
    return {
        type : 'HIDE_POPUP_START'
    }
}

export function hidePopupDone () {
    return {
        type : 'HIDE_POPUP_DONE'
    }
}