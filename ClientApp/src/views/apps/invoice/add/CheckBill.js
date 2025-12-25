import React, { useEffect, useState } from 'react'
import { Save } from 'react-feather'
import { Button } from 'reactstrap'
import Swal from 'sweetalert2'

const CheckBill = ({ dueDatepicker }) => {
    const [data, setdata] = useState("")

    const getData = async () => {
        const sendData = {
            Apikey2: window.location.search,
            WebHeader: "Bill"

        }
        console.log(sendData)
       
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getbillingcheck`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then((response) => response.json())
            .then(response => {
                console.log(response)
                if (response.activeStatus === "A") {
                    setdata(response.cloudInterfactDisplaySectionId)
                } else {
                   window.location.href = `${window.location.origin}/apps/user/list`
                }
            })

    }


    const SaveData = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to save this Bill!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Save it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const sendData = {
                    CloudInterfactDisplaySectionId: Number(data),
                    Apikey1: dueDatepicker
                }
                console.log(sendData)
                await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/SaveBill`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sendData)

                })
                    .then((response) => response.json())
                    .then(response => {
                        console.log(response)

                        if (response === "Done") {
                            Swal.fire(
                                'Submit!',
                                'Your Bill has been Saved.',
                                'success'
                            ).then(window.location.pathname = "/apps/invoice/list")
                        } else {
                            Swal.fire(
                                'Error!',
                                'Add Items to Your Bill.',
                                'error'
                            )
                        }

                    })
               
            }
        })
        

    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <Button color='success' onClick={() => SaveData()} block outline>
          <Save size={20}/>  Save
        </Button>
        )

}
export default CheckBill