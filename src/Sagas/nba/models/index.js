import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import { postNBAModel, getNBAModels, deleteNBAModel } from 'Apis'

// Constants
import { CREATE_NBA_MODEL, FETCH_NBA_MODELS, DELETE_NBA_MODEL } from 'Constants'

// Actions
import { createNBAModelSuccess, fetchNBAModelsSuccess, deleteNBAModelSuccess } from 'Actions'

function* createModel ({ model }) {
  try {
    const modelData = yield call(postNBAModel, model)
    yield put(createNBAModelSuccess(modelData))
  } catch ({ response }) {
    console.log('Failed to create model')
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

function* watchCreateModel () {
  yield takeLatest(CREATE_NBA_MODEL, createModel)
}

function* watchFetchModels () {
  yield takeLatest(FETCH_NBA_MODELS, fetchModels)
}

function* watchDeleteModel () {
  yield takeLatest(DELETE_NBA_MODEL, deleteModel)
}

export default function* modelsSaga () {
  yield [
    watchCreateModel(),
    watchFetchModels(),
    watchDeleteModel()
  ]
}
