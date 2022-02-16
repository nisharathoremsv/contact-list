import {
    DELETE_USER,
    SET_USERS,
    FILTER_Z_TO_A,
    FILTER_A_TO_Z
} from './type'

let initialState = {
    users: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case DELETE_USER: {
            const usersRef = [...state.users]
            const currentUser = usersRef.filter(item => action.payload !== item.id)
            return { ...state, users: currentUser }
        }

        case SET_USERS: {
            return {
              ...state,
              users: action.payload
            }
          }

          case FILTER_A_TO_Z: {
            const usersRef = [...state.users]
            const filterList = usersRef.sort((a,b) => {

                var keyA = a.first_name.toLowerCase(),
                keyB =b.first_name.toLowerCase()
            // Compare the 2 dates
                if (keyA < keyB) return -1
                if (keyA > keyB) return 1
                return 0
              })
            return { ...state, users: filterList}
          }


          case FILTER_Z_TO_A: {
            const usersRef = [...state.users]
            const filterList = usersRef.sort((a,b) => {

                var keyA = a.first_name.toLowerCase(),
                keyB =b.first_name.toLowerCase()
            // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
              })
            return { ...state, users: filterList}
          }

        default:
            return state
    }
}

export default userReducer