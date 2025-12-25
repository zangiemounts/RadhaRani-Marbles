// ** Third Party Components
import classnames from 'classnames'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import Basic from '@src/assets/images/illustration/Pot1.svg'
import silver from '@src/assets/images/illustration/Pot2.svg'
import gold from '@src/assets/images/illustration/Pot3.svg'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Badge, ListGroup, Button, Spinner } from 'reactstrap'
import { useState } from 'react'
function loadScript(src) {

    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const PricingCards = ({ duration, bordered, fullWidth, cols }) => {
    const [load, setload] = useState(false)
    const userAvatar = defaultAvatar
    const __DEV__ = document.domain === 'localhost'

    /*if (duration === 'yearly') { setpriceval("USD") } else { setpriceval("INR") }*/
    const displayRazorpay = async (id, name) => {
        setload(true)
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const sendData2 = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('userId')),
            ProductId: Number(id),
            DomainDesc: duration,
            Successurl:`${window.location.origin}/success`,
            Failurl: `${window.location.origin}/failur`

        }
        console.log(sendData2)

        const data = await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Initiate`, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData2)
        }).then((t) => t.json()
        )

        console.log(data)
        const options = {
            key: __DEV__ ? data.key : data.key,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.orderid,
            name: 'Mounts',
            description: `Update To${name}`,
            image: userAvatar,
            handler: async function (response) {
                const sendData3 = {
                    OrgId: Number(localStorage.getItem("orgId")),
                    UserId: Number(localStorage.getItem('userId')),
                    Apikey1: response.razorpay_order_id,
                    Apikey2: response.razorpay_payment_id
                }
                console.log(sendData3)
                const maindata = await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Check`, {
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sendData3)
                }).then((s) => s.json()
                )

                window.location.href = maindata
            },
            prefill: {
                name: data.name,
                email: data.email,
                contact: data.mobileNo
            }
        }
        console.log(options)
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()


    }


  const colsProps = cols ? cols : { md: 4, xs: 12 }

  /*const renderPricingCards = () => {
    return data.map((item, index) => {
      const monthlyPrice = duration === 'yearly' ? item.yearlyPlan.perMonth : item.monthlyPrice,
        yearlyPrice = duration === 'yearly' ? item.yearlyPlan.totalAnnual : item.monthlyPrice,
        imgClasses = item.title === 'Basic' ? 'mb-2 mt-5' : item.title === 'Standard' ? 'mb-1' : 'mb-2'
        
      return (
        <Col key={index} {...colsProps}>
          <Card
            className={classnames('text-center', {
              border: bordered,
              'shadow-none': bordered,
              popular: item.popular === true,
              'border-primary': bordered && item.popular === true,
              [`${item.title.toLowerCase()}-pricing`]: item.title
            })}
          >
            <CardBody>
              {item.popular === true ? (
                <div className='pricing-badge text-end'>
                  <Badge color='light-primary' pill>
                    Popular
                  </Badge>
                </div>
              ) : null}
              <img className={imgClasses} src={item.img} alt='pricing svg' />
              <h3>{item.title}</h3>
              <CardText>{item.subtitle}</CardText>
              <div className='annual-plan'>
                <div className='plan-price mt-2'>
                  <sup className='font-medium-1 fw-bold text-primary me-25'>$</sup>
                  <span className={`pricing-${item.title.toLowerCase()}-value fw-bolder text-primary`}>
                    {monthlyPrice}
                  </span>
                  <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>/month</span>
                </div>
                {item.title !== 'Basic' && duration === 'yearly' ? (
                  <small className='annual-pricing text-muted'>USD {yearlyPrice} / year</small>
                ) : null}
              </div>
              <ListGroup tag='ul' className='list-group-circle text-start mb-2'>
                {item.planBenefits.map((benefit, i) => (
                  <ListGroupItem key={i} tag='li'>
                    {benefit}
                  </ListGroupItem>
                ))}
              </ListGroup>
                      <Button block outline={item.title !== 'Standard'} onClick={() => displayRazorpay(122, 'Premium')} color={item.title === 'Basic' ? 'success' : 'primary'}>
                {item.title === 'Basic' ? 'Your current plan' : 'Upgrade'}
              </Button>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }*/

    const renderPricingCards = () => {
      
        return (
                <>
                <Col key={1} {...colsProps}>
                    <Card
                        className={classnames('text-center', {
                            border: bordered,
                            'shadow-none': bordered
                        })}
                    >
                        <CardBody>

                            <img src={Basic} alt='pricing svg' />
                            <h3>Basic</h3>
                            <CardText>A simple start for everyone</CardText>
                            <div className='annual-plan'>
                                <div className='plan-price mt-2'>
                                    <sup className='font-medium-1 fw-bold text-primary me-25'>{duration === 'USD' ? '$' : '₹'}</sup>
                                    <span className={`pricing-value fw-bolder text-primary`}>
                                        {duration === 'USD' ? 7 : 500}
                                    </span>
                                    <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>/month</span>
                                </div>
                               
                            </div>
                            <ListGroup tag='ul' className='list-group-circle text-start mb-2'>
                                Feather updated soon..... Thanks for your patience
                            </ListGroup>
                            <Button block onClick={() => displayRazorpay(121, 'Mounts Basic')} color={'primary'}>
                                {load === false ? "Buy Plan" : <Spinner color="success" type="grow" />} 
                            </Button>
                        </CardBody>

                    </Card>
                </Col>
                <Col key={2} {...colsProps}>
                    <Card
                        className={classnames('text-center', {
                            border: bordered,
                            'shadow-none': bordered,
                            popular: true,
                            'border-primary': bordered
                        })}
                    >
                        <CardBody>
                            <div className='pricing-badge text-end'>
                                <Badge color='light-primary' pill>
                                    Popular
                                </Badge>
                            </div>
                            <img src={gold} alt='pricing svg' />
                            <h3>Gold</h3>
                            <CardText>More and Powerfull feather for your Orgnization</CardText>
                            <div className='annual-plan'>
                                <div className='plan-price mt-2'>
                                    <sup className='font-medium-1 fw-bold text-primary me-25'>{duration === 'USD' ? '$' : '₹'}</sup>
                                    <span className={`pricing-value fw-bolder text-primary`}>
                                        {duration === 'USD' ? 25 : 2000}
                                    </span>
                                    <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>/month</span>
                                </div>

                            </div>
                            <ListGroup tag='ul' className='list-group-circle text-start mb-2'>
                                Feather updated soon..... Thanks for your patience
                            </ListGroup>
                            <Button block onClick={() => displayRazorpay(123, 'Mounts Gold')} color={'primary'}>
                                {load === false ? "Upgrade Plan" : <Spinner color="success" type="grow" />}  
                            </Button>
                        </CardBody>

                    </Card>
                </Col>

                <Col key={3} {...colsProps}>
                    <Card
                        className={classnames('text-center', {
                            border: bordered,
                            'shadow-none': bordered
                        })}
                    >
                        <CardBody>

                            <img src={silver} alt='pricing svg' />
                            <h3>Silver</h3>
                            <CardText>Some good feather that is better than basic</CardText>
                            <div className='annual-plan'>
                                <div className='plan-price mt-2'>
                                    <sup className='font-medium-1 fw-bold text-primary me-25'>{duration === 'USD' ? '$' : '₹'}</sup>
                                    <span className={`pricing-value fw-bolder text-primary`}>
                                        {duration === 'USD' ? 13 : 1000}
                                    </span>
                                    <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>/month</span>
                                </div>
                               
                            </div>
                            <ListGroup tag='ul' className='list-group-circle text-start mb-2'>
                                Feather updated soon..... Thanks for your patience
                            </ListGroup> 
                            <Button block onClick={() => displayRazorpay(122, 'Mounts Silver')} color={'primary'}>
                                {load === false ? "Upgrade Plan" : <Spinner color="success" type="grow" />}
                            </Button>
                        </CardBody>

                    </Card>
                </Col>
                
                </>
            )
        
    }

  const defaultCols = {
    sm: { offset: 2, size: 10 },
    lg: { offset: 2, size: 10 }
  }

  return (
    <Row className='pricing-card'>
      <Col {...(!fullWidth ? defaultCols : {})} className={classnames({ 'mx-auto': !fullWidth })}>
        <Row>{renderPricingCards()}</Row>
      </Col>
    </Row>
  )
}

export default PricingCards
