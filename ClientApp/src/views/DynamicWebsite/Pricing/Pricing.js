import React from 'react'
import { Button } from '../globalStyles'
import { GiCloudRing, GiCutDiamond, GiIdCard } from 'react-icons/gi'
import { IconContext } from 'react-icons/lib'
import {
  PricingSection,
  PricingWrapper,
  PricingHeading,
  PricingContainer,
  PricingCard,
  PricingCardInfo,
  PricingCardIcon,
  PricingCardPlan,
  PricingCardCost,
  PricingCardLength,
  PricingCardFeatures,
  PricingCardFeature
} from './Pricing.elements'

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <PricingSection>
        <PricingWrapper>
          <PricingHeading>Mounts Product</PricingHeading>
          <PricingContainer>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiIdCard />
                </PricingCardIcon>
                <PricingCardPlan>Zangie Card</PricingCardPlan>
                <PricingCardCost>(Digital Cards)</PricingCardCost>
                <PricingCardLength>Turn paper cards <br /> into digital contacts </PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Cloud Contacts</PricingCardFeature>
                  <PricingCardFeature>Message Customers</PricingCardFeature>
                  <PricingCardFeature>Share Cards Across Platform</PricingCardFeature>
                </PricingCardFeatures>
                <Button onClick={() => window.location.replace('https://zangie.mounts.in/')} primary>VIew Product</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard >
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCloudRing />
                </PricingCardIcon>
                <PricingCardPlan>Cloud Product</PricingCardPlan>
                <PricingCardCost>(Cortex Application)</PricingCardCost>
                <PricingCardLength>End To End Automation</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Alerts System</PricingCardFeature>
                  <PricingCardFeature>Process automation</PricingCardFeature>
                  <PricingCardFeature>Next Generation AI and ML</PricingCardFeature>
                </PricingCardFeatures>
                <Button onClick={() => window.location.replace('http://a.mounts.in/ProductPageM')} primary>VIew Product</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCutDiamond />
                </PricingCardIcon>
                <PricingCardPlan>Customised App</PricingCardPlan>
                <PricingCardCost>(Dedicated Cloud)</PricingCardCost>
                <PricingCardLength>Card Dedicated Cloud</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Activity Management</PricingCardFeature>
                  <PricingCardFeature>Transaction Automation</PricingCardFeature>
                  <PricingCardFeature>AI Cloud Management</PricingCardFeature>
                </PricingCardFeatures>
                <Button onClick={() => window.location.replace('http://a.mounts.in/ProductPageC')} primary>VIew Product</Button>
              </PricingCardInfo>
            </PricingCard>
          </PricingContainer>
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  )
}
export default Pricing
