// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import AccountTabContent from './AccountTabContent'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import BankDetails from './BankDetails'
import AddUsers from './OrgTabContent'

const AccountSettings = () => {
  // ** States
  const [data, setData] = useState(null)
    const [activeTab, setActiveTab] = useState('1')

    const toggleTab = tab => {
        setActiveTab(tab)
    }
  useEffect(() => {
    axios.get('/account-setting/data').then(response => setData(response.data))
  }, [])

  return (
    <Fragment>
          {/* <TabPane tabId='2'>
                <OrgTabContent data={data.general}/>
              </TabPane>
               <TabPane tabId='3'>
                <BankDetails data={data.general}/>
              </TabPane>*/}
      {data !== null ? (    
        <Row>
          <Col xs={12}>
             <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTabContent data={data.general} />
              </TabPane>
             
               </TabContent>
              
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
