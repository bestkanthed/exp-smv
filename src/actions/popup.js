export function loadPopup (content) {
    console.log("Load popup called");
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