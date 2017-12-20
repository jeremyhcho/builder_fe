// Constants
import {
  FETCH_NBA_SUMMARY,
  RECEIVE_NBA_SUMMARY
} from 'Constants'

export const fetchNBASummary = (id) => ({
  type: FETCH_NBA_SUMMARY,
  id
})

export const receiveNBASummary = (summary) => ({
  type: RECEIVE_NBA_SUMMARY,
  summary
})
