// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import users from '@src/views/apps/user/store'
import invoice from '@src/views/apps/invoice/store'
import dataTables from '@src/views/tables/data-tables/store'

const rootReducer = {
  auth,
  users,
  navbar,
  layout,
  invoice,
  dataTables
}

export default rootReducer
