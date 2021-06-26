import React from 'react'
import { render } from 'react-dom'
import { Admin, Resource } from 'react-admin'
import { httpClient } from './clients/httpClient'
import restClient from './clients/restClient'

import { ReportList, ReportEdit, ReportShow, ReportIcon } from './resources/reports'

const history = require('history').createBrowserHistory()

const App = () => (
  <Admin title="Report manager UI" dataProvider={restClient} history={history}>
    <Resource name="reports" options={{label:"Reports"}} list={ReportList} edit={ReportEdit} show={ReportShow} icon={ReportIcon} />
  </Admin>
)

export default App
