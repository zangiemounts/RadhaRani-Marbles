// ** Invoice Add Components
import AddCard from './AddCard'
import AddActions from './AddActions'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import ViewBill from './ViewBill'

const InvoiceAdd = () => {
  return (
    <div className='invoice-add-wrapper'>
      {/*<Row className='invoice-add'>
        <Col xl={9} md={8} sm={12}>
          <AddCard />
        </Col>
              <Col xl={9} md={8} sm={12}>
          <ViewBill />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions />
        </Col>
      </Row>*/}
          <AddCard />
    </div>
  )
}

export default InvoiceAdd
