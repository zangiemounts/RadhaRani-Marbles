import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from '../globalStyles'
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img
} from './InfoSection.elements'

function InfoSection({
  primary,
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  descriptions,
  description1,
  description2,
  description3,
  buttonLabel,
  img,
  alt,
  imgStart,
  start,
  margin,
  buttonstate,
  infostate,
  ImageData,
  Data
}) {
    const regexPattern = new RegExp("true" || "false")

    const lightback = regexPattern.test(Data.lightBg)
    const lighttextt = regexPattern.test(Data.lightText)
    const buttonst = regexPattern.test(Data.buttonstate)
    const primar = regexPattern.test(Data.primary)
    const lighttextdesc = regexPattern.test(Data.lightTextDesc)
    const lighttop = regexPattern.test(Data.lightTopLine)
    const start1 = regexPattern.test(Data.start)
    

  return (
    <>
      <InfoSec lightBg={lightback}>
        <Container style={{marginTop:Number(Data.margin)}}>
          <InfoRow imgStart={Data.imgStart}>
            <InfoColumn>
              <TextWrapper>
                <TopLine lightTopLine={lighttop}>{Data.topLine}</TopLine>
                <Heading lightText={lighttextt}>{Data.headline}</Heading>
                <Subtitle lightTextDesc={lighttextdesc}>{Data.description}
                </Subtitle>
                {infostate === true ? <Subtitle lightTextDesc={lightTextDesc}>{descriptions}<br / >  <br / > {description1} 
                <br / > <br / >  {description2}
                <br / > <br / >  {description3}
                </Subtitle> : null}
                
              {buttonst === true ? <Link to='/sign-up'>
                  <Button big fontBig primary={primar}>
                    {"Get Started"}
                  </Button>
                </Link> : null}
               
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start={start1}>
               <Img src={Data.img} alt={alt} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  )
}

export default InfoSection
