import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa'
import {
  FooterContainer,
  FooterSubscription,
  FooterSubText,
  FooterSubHeading,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink
} from './Footer.elements'

function Footer() {
    const date = new Date
  return (
    <FooterContainer>
      <FooterSubscription>
        <FooterSubHeading>
        
Cortex, the cloud product automating day to day activity like <br /> payroll, HR, activity management, purchase, inventory,store, visitor tracking,<br />  alerts, smart dashboard, transaction, finance, sales, AI and Smart Digital Card Zangie

        </FooterSubHeading>
        <FooterSubText></FooterSubText>
      
      </FooterSubscription>
      <FooterLinksContainer>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>Mounts</FooterLinkTitle>
            <FooterLink to='/sign-up'>How it works</FooterLink>
            <FooterLink to='/'>Blog</FooterLink>
            <FooterLink to='/'>Get the App</FooterLink>
            <FooterLink to='/'>FAQ</FooterLink>
           
          </FooterLinkItems>
          <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>Company</FooterLinkTitle>
            <FooterLink to='/'>About Us</FooterLink>
            <FooterLink to='/'>Press</FooterLink>
            <FooterLink to='/'>Agency</FooterLink>
            <FooterLink to='/'>Contact Us</FooterLink>
          </FooterLinkItems>
          <FooterLinkItems>
            <FooterLinkTitle>Products</FooterLinkTitle>
            <FooterLink to='/'>Zangie Card</FooterLink>
            <FooterLink to='/'>Cloud Product</FooterLink>
            <FooterLink to='/'>Customised App</FooterLink>
            
          </FooterLinkItems>
        </FooterLinksWrapper> 
          <FooterLinkItems>
            <FooterLinkTitle>Legal</FooterLinkTitle>
            <FooterLink to='/'>Privacy Policy</FooterLink>
            <FooterLink to='/'>Terms of Service</FooterLink>
            <FooterLink to='/'>Data Protection Addendum </FooterLink>
            <FooterLink to='/'>Acceptable Use Policy</FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
      
      </FooterLinksContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to='/'>
            MOUNTS
          </SocialLogo>
          <WebsiteRights>Copyright © {date.getFullYear()} </WebsiteRights>
          <SocialIcons>
            <SocialIconLink href='/' target='_blank' aria-label='Facebook'>
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink href='/' target='_blank' aria-label='Instagram'>
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink
              href={
                '//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'
              }
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink href='/' target='_blank' aria-label='Twitter'>
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink href='/' target='_blank' aria-label='LinkedIn'>
              <FaLinkedin />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  )
}

export default Footer
