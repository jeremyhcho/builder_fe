import React from 'react'

// Components
import { DocumentTitle, QuzeLink } from 'Components/Common'

// CSS
import './Dashboard.scss'

// Assets
import Podium from 'Assets/Icons/podium.svg'
import Microphone from 'Assets/Icons/microphone.svg'
import User from 'Assets/Icons/user.svg'

const SECTIONS = [
  {
    route: '/admin/potd',
    label: 'Pick of the Day',
    key: 'potd',
    icon: Podium
  },
  {
    route: '/admin/announcements',
    label: 'Announcements',
    key: 'announcements',
    icon: Microphone
  },
  {
    route: '/admin/users',
    label: 'Users',
    key: 'users',
    icon: User
  }
]

class AdminDashboard extends React.Component {
  render () {
    return (
      <DocumentTitle title='Quze - Admin Dashboard' header='Admin Dashboard'>
        <div styleName='admin-dashboard'>
          {
            SECTIONS.map(section => (
              <QuzeLink
                to={{ pathname: section.route }}
                key={section.key}
              >
                <div styleName='section-cell'>
                  <section.icon width={30} height={30} />
                  <h4 className='semibold'>{section.label}</h4>
                </div>
              </QuzeLink>
            ))
          }
        </div>
      </DocumentTitle>
    )
  }
}

export default AdminDashboard
