// ** Reactstrap Imports
import { Input } from 'reactstrap'

const PricingHeader = ({ duration, setDuration }) => {
    const onChange = e => {
    if (e.target.checked) {
      setDuration('USD')
    } else {
      setDuration('INR')
    }
  }

  return (
    <div className='text-center'>
      <h1 className='mt-5'>Pricing Plans</h1>
      <p className='mb-2 pb-75'>
        All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your needs.
      </p>
      <div className='d-flex align-items-center justify-content-center mb-5 pb-50'>
        <h6 className='me-50 mb-0'>INR</h6>
        <div className='form-switch'>
          <Input id='plan-switch' type='switch' checked={duration === 'USD'} onChange={onChange} />
        </div>
        <h6 className='ms-50 mb-0'>USD</h6>
      </div>
    </div>
  )
}

export default PricingHeader
