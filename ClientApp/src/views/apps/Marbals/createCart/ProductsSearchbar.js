// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
    const { dispatch, setSearchText, store } = props
   // console.log(window.location.search.substring(1).length)

 
  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        {window.location.search.substring(1).length > 0 ? (<Col sm="4">
        
                  <Search className='text-muted m-2' style={{ cursor: "pointer" }} onClick={() => (window.location.search = "") } size={20} />
            
        </Col>) : (
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              
              placeholder='Search Items by Lot No || Thikness || Quantity || Size'
              onChange={e => setSearchText(e.target.value)}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>)}
      </Row>
    </div>
  )
}

export default ProductsSearchbar
