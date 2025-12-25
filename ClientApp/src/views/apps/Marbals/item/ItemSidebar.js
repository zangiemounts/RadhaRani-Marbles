// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

import { useForm } from 'react-hook-form'
// ** Third Party Components
import classnames from 'classnames'
// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Button } from 'reactstrap'
import { Plus } from "react-feather"
// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'
import { useState } from 'react'
import AddItemSidebar from './AddItemSidebar'

const ItemSidebar = props => {
    const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
    const {
        handleSubmit,
        formState: { errors }
    } = useForm({})
  // ** Props
    const { sidebarOpen } = props

    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)
  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Row>
            <Col sm='12'>
              <h4 className='filter-heading d-none d-lg-block'>Add</h4>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div id='clear-filters'>
                <Button color='success' block onClick={() => setOpenTaskSidebar(!openTaskSidebar)}>
                <Plus/> Add Items
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
          </div>

          <AddItemSidebar
              open={openTaskSidebar}
              handleTaskSidebar={handleTaskSidebar}
          />
          
    </div>
  )
}

export default ItemSidebar
