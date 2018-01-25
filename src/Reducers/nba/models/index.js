// // // Constants
// // import {
// //   CREATE_NBA_MODEL,
// //   CREATE_NBA_MODEL_SUCCESS,
// //   CREATE_NBA_MODEL_FAIL,
// //   FETCH_NBA_MODELS,
// //   FETCH_NBA_MODELS_SUCCESS,
// //   DELETE_NBA_MODEL_SUCCESS,
// //   UPDATE_NBA_MODEL,
// //   UPDATE_NBA_MODEL_SUCCESS,
// //   UPDATE_NBA_MODEL_FAIL
// // } from 'Constants'
//
// const initialState = {
//   modelList: [],
//   creatingModel: false,
//   updatingModel: false,
//   fetchingModels: false,
// }
//
// const models = (state = initialState, action) => {
//   switch (action.type) {
//     // case CREATE_NBA_MODEL:
//     //   return { ...state, creatingModel: true }
//     //
//     // case CREATE_NBA_MODEL_SUCCESS:
//     //   return {
//     //     ...state,
//     //     modelList: [...state.modelList, action.model.data],
//     //     creatingModel: false
//     //   }
//     //
//     // case CREATE_NBA_MODEL_FAIL:
//     //   return {
//     //     ...state,
//     //     creatingModel: false
//     //   }
//     //
//     // case FETCH_NBA_MODELS:
//     //   return { ...state, fetchingModels: true }
//     //
//     // case FETCH_NBA_MODELS_SUCCESS:
//     //   return {
//     //     ...state,
//     //     modelList: action.models.data,
//     //     fetchingModels: false
//     //   }
//     //
//     // case DELETE_NBA_MODEL_SUCCESS:
//     //   return {
//     //     ...state,
//     //     modelList: state.modelList.filter(model => model.id !== action.id)
//     //   }
//     //
//     // case UPDATE_NBA_MODEL:
//     //   return { ...state, updatingModel: true }
//     //
//     // case UPDATE_NBA_MODEL_SUCCESS:
//     //   return {
//     //     ...state,
//     //     modelList: state.modelList.map(model => {
//     //       if (model.id !== action.newModel.data.id) return model
//     //       return action.newModel.data
//     //     }),
//     //     updatingModel: false
//     //   }
//     //
//     // case UPDATE_NBA_MODEL_FAIL:
//     //   return {
//     //     ...state,
//     //     updatingModel: false
//     //   }
//
//     default:
//       return state
//   }
// }
//
// export default models
