// ** Third Party Components
import classnames from 'classnames'
import { Menu, Grid, List, Plus } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import AddItemSidebar from './AddItemSidebar'
import { useState } from 'react'

const ItemsHeader = props => {
  // ** Props
    const { activeView, setActiveView, dispatch, getProducts, store, setSidebarOpen } = props
    const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
  // ** Sorting obj
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured'
  }
    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)
  return (
    <div className='ecommerce-header'>
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items'>
                      <div className='content-left'>
                          <Button color='success' className={'btn-icon view-btn grid-view-btn ml-0 '} onClick={() => setOpenTaskSidebar(!openTaskSidebar)}>
                              <Plus size={20} /><b> Add Items</b>
                          </Button>
                      </div>
            <div className='result-toggler'>
             {/* <button className='navbar-toggler shop-sidebar-toggler' onClick={() => setSidebarOpen(true)}>
                <span className='navbar-toggler-icon d-block d-lg-none'>
                  <Menu size={14} />
                </span>
              </button>*/}
              <span className='search-results'>{store.length} Results Found</span>
            </div>
            

            <div className='view-options d-flex '>
                         {/* <Button
                              tag='label'
                              className={'btn-icon view-btn grid-view-btn ml-0 '}
                              color='success'
                              onClick={() => setActiveView('grid')}
                          >
                              Add Items
                          </Button>*/}
              <ButtonGroup>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
           <AddItemSidebar
              open={openTaskSidebar}
              handleTaskSidebar={handleTaskSidebar}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ItemsHeader
