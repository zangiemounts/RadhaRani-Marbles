import { useEffect, useState } from "react"
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption } from 'reactstrap'
import img2 from '@src/assets/images/pages/Radharanip.png'
export const CrousalImage = ({ ProductImageId }) => {

    const [ImageData, setImageData] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [animating, setAnimating] = useState(false)


    const getImageData = async () => {

        const sendData = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrgId: Number(localStorage.getItem("orgId")),
            Value: Number(ProductImageId),
            WebHeader: "ProductImage",
            CloudInterfactDisplaySectionId: Number(2)

        }
       // console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetImages`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then(response => response.json())
            .then(
                data => {
                   // console.log(data)
                    setImageData(data)

                })
    }

    const next = () => {
        if (animating) return
        const nextIndex = activeIndex === ImageData.length - 1 ? 0 : activeIndex + 1
        setActiveIndex(nextIndex)
    }

    const previous = () => {
        if (animating) return
        const nextIndex = activeIndex === 0 ? ImageData.length - 1 : activeIndex - 1
        setActiveIndex(nextIndex)
    }

    const slides = ImageData.map((item, index) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
            >
                <img src={`https://mountsimageapi.azurewebsites.net/api/FileUpload/${item.urlimage1}`} style={{ maxHeight: "300px", maxWidth:"300px" }} className='img-fluid card-img-top' alt={item.altText} />
            </CarouselItem>
        )
    })

    //style={{ minHeight: "100", maxHeight: "150", minWidth: "150", maxWidth:"200" }} 

    useEffect(() => {
        getImageData()
    }, [])

    if (ImageData.length === 0) {
        return <img src={img2} alt="Default Image" style={{ maxHeight: "300px", maxWidth: "300px" }} />
    }

    return (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    )
}