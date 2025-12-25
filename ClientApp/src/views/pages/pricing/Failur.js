import React from 'react'
import Swal from 'sweetalert2'
import defaultAvatar from '@src/assets/images/backgrounds/Background.png'
import bacgif from '@src/assets/images/backgrounds/giphyerr.gif'

const Failur = () => {

    const img = defaultAvatar
    const gif = bacgif
    const sweetsuccess = () => {

        let timerInterval
        Swal.fire({
            title: 'Oops! Payment Failed Please Try again later....',
            text: 'Your Payment has been Successfull.',
            icon: 'warning',
            html: 'I will close in <b></b> milliseconds.',
            timer: 3000,
            width: 700,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            padding: '3em',
            color: '#716add',
            background: `url(${img})`,
            backdrop: `
    rgba(155, 62, 61)
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
                window.location.pathname = "/apps/invoice/list"
            }
        })
    }
    return (
        <>
          
            {sweetsuccess()}
        </>
        )

}
export default Failur