// Constants
import {
  OPEN_NBA_INTRO_CUE,
  NBA_INTRO_MODEL_CUE,
  NBA_INTRO_CREATE_MODEL_CUE,
  NBA_INTRO_SUBMIT_MODEL_CUE,
  NBA_INTRO_CONGRATULATIONS_CUE
} from 'Constants'

export const openNBAIntroCue = () => ({
  type: OPEN_NBA_INTRO_CUE
})

export const openNBAIntroModelCue = () => ({
  type: NBA_INTRO_MODEL_CUE
})

export const openNBAIntroCreateModelCue = () => ({
  type: NBA_INTRO_CREATE_MODEL_CUE
})

export const openNBAIntroSubmitModelCue = () => ({
  type: NBA_INTRO_SUBMIT_MODEL_CUE
})

export const openNBAIntroCongratulationsCue = () => ({
  type: NBA_INTRO_CONGRATULATIONS_CUE
})
