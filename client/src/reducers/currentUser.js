const currentUserReducer = (state = {loading: false, currentUser: null, err: ''}, action) => {
    switch(action.type){
        case 'CURRENT_USER_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'CURRENT_USER_SUCCESS':
            return {
                loading: false,
                currentUser: action.payload,
                err: ''
            }
            
        case 'CURRENT_USER_FAILURE':
            return {
                loading: false,
                currentUser: null,
                err: action.payload
            }

        default:
            return state
    }
}



export default currentUserReducer