import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  postNBAModel,
  getNBAModels,
  deleteNBAModel,
  putNBAModel
} from 'Apis'

// Constants
import {
  CREATE_NBA_MODEL,
  CREATE_NBA_MODEL_FAIL,
  FETCH_NBA_MODELS,
  DELETE_NBA_MODEL,
  UPDATE_NBA_MODEL,
  UPDATE_NBA_MODEL_FAIL
} from 'Constants'

// Actions
import {
  createNBAModelSuccess,
  fetchNBAModelsSuccess,
  deleteNBAModelSuccess,
  updateNBAModelSuccess
} from 'Actions'

// Helpers
import errorMessage from 'Helpers/errorMessage'

function* createModel ({ model }) {
  try {
    const modelData = yield call(postNBAModel, model)
    yield put(createNBAModelSuccess(modelData))
  } catch ({ response }) {
    yield put({ type: CREATE_NBA_MODEL_FAIL, error: errorMessage(response) })
  }
}

function* fetchModels () {
  try {
    const models = yield call(getNBAModels)
    yield put(fetchNBAModelsSuccess(models))
  } catch ({ response }) {
    console.log('Failed to fetch models')
  }
}

function* deleteModel ({ id }) {
  try {
    yield call(deleteNBAModel, id)
    yield put(deleteNBAModelSuccess(id))
  } catch ({ response }) {
    console.log('Failed to delete model')
  }
}

function* updateModel ({ id, model }) {
  try {
    const newModel = yield call(putNBAModel, id, model)
    yield put(updateNBAModelSuccess(newModel))
  } catch ({ response }) {
    yield put({ type: UPDATE_NBA_MODEL_FAIL, error: errorMessage(response) })
  }
}

function* watchCreateModel () {
  yield takeLatest(CREATE_NBA_MODEL, createModel)
}

function* watchFetchModels () {
  yield takeLatest(FETCH_NBA_MODELS, fetchModels)
}

function* watchDeleteModel () {
  yield takeLatest(DELETE_NBA_MODEL, deleteModel)
}

function* watchUpdateModel () {
  yield takeLatest(UPDATE_NBA_MODEL, updateModel)
}

export default function* modelsSaga () {
  yield all([
    watchCreateModel(),
    watchFetchModels(),
    watchDeleteModel(),
    watchUpdateModel()
  ])
}
