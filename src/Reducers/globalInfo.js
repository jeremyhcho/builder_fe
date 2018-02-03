import { UPDATE_PAGE_HEADER, UPDATE_BACK_URL } from 'Constants'

const initialState = {
  header: '',
  backUrl: ''
}

const globalInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE_HEADER:
      return { ...state, header: action.header }

    case UPDATE_BACK_URL:
      return { ...state, backUrl: action.backUrl }

    default:
      return state
  }
}

export default globalInfoReducer
