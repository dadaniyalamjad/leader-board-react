import { USER_LIST_LOADING, USER_LIST_SUCCESS, USER_LIST_ERROR } from '../../../constant/ActionTypes/UserType'

const allUserReducer = (state: object = {}, action: any) => {
    switch (action.type) {
        case USER_LIST_LOADING: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case USER_LIST_SUCCESS: {
            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case USER_LIST_ERROR: {
            let obj: any = {
                loading: false,
                status: action.response,
            };
            return obj;
        }
        default:
            return state;
    }
}

export default allUserReducer