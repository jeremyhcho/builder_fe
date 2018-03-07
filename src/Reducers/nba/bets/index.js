// Constants
import {
  OPEN_BET_MODAL,
  CLOSE_BET_MODAL,
  SUBMIT_EDIT_BET,
  CLOSE_EDIT_BET
} from 'Constants'

const initialState = {
  openBetModal: false,
  modalBetId: 0,
  submitEditBet: false
}

const betsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_BET_MODAL:
      return { ...state, openBetModal: true, modalBetId: action.betId }

    case CLOSE_BET_MODAL:
      return { ...state, openBetModal: false, modalBetId: 0 }

    case SUBMIT_EDIT_BET:
      return { ...state, submitEditBet: true }

    case CLOSE_EDIT_BET:
      return { ...state, submitEditBet: false }

    default:
      return state
  }
}

export default betsReducer
