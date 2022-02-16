import { 
    DELETE_USER,
    SET_USERS,
    FILTER_Z_TO_A,
    FILTER_A_TO_Z
 } from "./type"

 import { getContactList } from "../../network/userService"

 export const getUsers = () => (dispatch) => {
  getContactList()
  .then((res) => {
    const response = res.data
    if (response?.data) (
      dispatch({
        type: SET_USERS,
        payload: response.data
      })
    )
  })
}

  export const deleteUser = id => (
      {
        type: DELETE_USER,
        payload: id 
      }
  )

  export const filterByZtoA = () => ({ type: FILTER_Z_TO_A})

  export const filterByAtoZ = () => ({type: FILTER_A_TO_Z})
