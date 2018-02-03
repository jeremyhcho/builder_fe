import { UPDATE_PAGE_HEADER, UPDATE_BACK_URL } from 'Constants'

export const updatePageHeader = (header) => ({
  type: UPDATE_PAGE_HEADER,
  header
})

export const updateBackUrl = (backUrl) => ({
  type: UPDATE_BACK_URL,
  backUrl
})
