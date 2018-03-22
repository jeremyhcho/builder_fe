// Constants
import {
  OPEN_NBA_INTRO_CUE,
  OPEN_NBA_INTRO_MODEL_CUE,
  OPEN_NBA_INTRO_CREATE_MODEL_CUE,
  OPEN_NBA_INTRO_SUBMIT_MODEL_CUE,
  OPEN_NBA_INTRO_CONGRATULATIONS_CUE,
  CLOSE_NBA_INTRO_CUE
} from 'Constants'

export const openNBAIntroCue = () => ({
  type: OPEN_NBA_INTRO_CUE
})

export const openNBAIntroModelCue = () => ({
  type: OPEN_NBA_INTRO_MODEL_CUE
})

export const openNBAIntroCreateModelCue = () => ({
  type: OPEN_NBA_INTRO_CREATE_MODEL_CUE
})

export const openNBAIntroSubmitModelCue = () => ({
  type: OPEN_NBA_INTRO_SUBMIT_MODEL_CUE
})

export const openNBAIntroCongratulationsCue = () => ({
  type: OPEN_NBA_INTRO_CONGRATULATIONS_CUE
})

export const closeNBAIntroCue = () => ({
  type: CLOSE_NBA_INTRO_CUE
})
