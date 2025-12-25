import React from 'react'
import { Row, Col, Card, CardBody, CardText, Badge, ListGroup, ListGroupItem, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import defaultAvatar from '@src/assets/images/backgrounds/Background.png'
import bacgif from '@src/assets/images/backgrounds/giphy.gif'

const Success = () => {

    const img = defaultAvatar
    const gif = bacgif
    const sweetsuccess = () => {

        let timerInterval
        Swal.fire({
            title: 'Successfull! Your Payment has been Done',
            text: 'Your Payment has been Successfull.',
            icon: 'success',
            html: 'I will close in <b></b> milliseconds.',
            timer: 3000,
            width: 700,
            padding: '3em',
            color: '#716add',
            background: `url(${img})`,
            backdrop: `
    rgba(201, 242, 155)
    url(${gif})
    left center
    no-repeat
  `,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
                window.location.pathname = "/apps/invoice/list"
            }
        })
    }

    return (<>
        <Row>
            <Col key={3} >
                <Card
                    className='text-center'
                >
                    <CardBody style={{ backgroundColor: "lightgreen" }}>
                        <h3>Sucess</h3>
                        <CardText>Your Payment has been successfull</CardText>
                       
                    </CardBody>

                </Card>
            </Col>

        </Row>
        {sweetsuccess() }
        </>
        )

}
export default Success