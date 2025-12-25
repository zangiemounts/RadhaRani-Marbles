import React, { useState, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import ScrollToTop from './ScrollToTop'
import GlobalStyle from './globalStyles'
import InfoSection from './InfoSection/InfoSection'
import Footer from './Footer/Footer'
import Pricing from './Pricing/Pricing'

const About = () => {
    const [Data, setData] = useState([])
    const [ImageData, setImageData] = useState("")

    const GetwebData = async () => {
        const sendData2 = {
            OrgId: Number(239),
            UserId: Number(2123),
            Type: "MountsHomepageAbout"
        }
        console.log(sendData2)

        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getwebsitedata`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData2)

        })
            .then(response => response.json())
            .then(
                data => {
                    console.log(data)
                    setData(data)
                })


    }

    const GetImageData = async () => {
        const sendData2 = {
            OrgId: Number(239),
            UserId: Number(2123),
            ActiveStatus: "A",
            webHeader: "MounHomepage"
        }
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getmultipledata`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData2)

        })
            .then(response => response.json())
            .then(
                data => {
                    // console.log(data[0])
                    setImageData(data[0])


                })
    }
    useEffect(() => {
        GetwebData()
        GetImageData()
    }, [])
    return (
        <>
            <GlobalStyle />
            <Navbar />
            {Data.length > 0 ? Data.map((datamain, index) => (

                <InfoSection key={index} Data={datamain} />

            )) : null}
            <Footer />
        </>
    )
}
export default About