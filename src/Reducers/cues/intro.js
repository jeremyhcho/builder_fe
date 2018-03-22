// Constants
import {
  OPEN_NBA_INTRO_CUE,
  OPEN_NBA_INTRO_MODEL_CUE,
  OPEN_NBA_INTRO_CREATE_MODEL_CUE,
  OPEN_NBA_INTRO_SUBMIT_MODEL_CUE,
  OPEN_NBA_INTRO_CONGRATULATIONS_CUE
} from 'Constants'

const initialState = {
  welcomeModal: false,
  modelNavigate: false,
  modelCreate: false,
  modelSubmit: false,
  congratulationsModal: false
}

const intro = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NBA_INTRO_CUE:
      return { ...initialState, welcomeModal: true }

    case OPEN_NBA_INTRO_MODEL_CUE:
      return { ...initialState, modelNavigate: true }

    case OPEN_NBA_INTRO_CREATE_MODEL_CUE:
      return { ...initialState, modelCreate: true }

    case OPEN_NBA_INTRO_SUBMIT_MODEL_CUE:
      return { ...initialState, modelSubmit: true }

    case OPEN_NBA_INTRO_CONGRATULATIONS_CUE:
      return { ...initialState, congratulationsModal: true }

    default:
      return state
  }
}

export default intro

/**
 * Condition: First login
 Step 1: Welcome (Modal),
 Step 2: Model Navigation (Tooltip),
 Step 3: Create Model Button (Tooltip),
 Step 4: Submit Model Button (Tooltip),
 Step 5: Congratulations (Modal) --> Route to Games
 */
