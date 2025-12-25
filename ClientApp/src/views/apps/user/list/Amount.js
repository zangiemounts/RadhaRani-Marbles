import React from 'react'

function Amount(Amounttotal) {


    console.log(Amounttotal)
    return (

        <>
            {Amounttotal !== [] ? Amounttotal.map((item, index) => {
                <h5 >{item.billData.totalAmount}</h5>

            }) : null
            }
        </>
    )
}
export default Amount