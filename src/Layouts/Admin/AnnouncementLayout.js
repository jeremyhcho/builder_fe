import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import {
  Announcements,
  CreateAnnouncement,
  EditAnnouncement
} from 'Components/Admin'

const AnnouncementLayout = () => (
  <Switch>
    <Route exact path='/admin/announcements' component={Announcements} />
    <Route exact path='/admin/announcements/new' component={CreateAnnouncement} />
    <Route exact path='/admin/announcements/edit/:id' component={EditAnnouncement} />
  </Switch>
)

export default AnnouncementLayout
