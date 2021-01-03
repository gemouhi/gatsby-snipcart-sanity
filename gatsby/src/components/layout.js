import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../styles/globalStyle'

import Header from './header'
import SocialLinks from './SocialLinks'

const PageWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`

const MainSection = styled.main`
  margin: 30px 0;
  width: 100%;
`

const FooterStyled = styled.footer`
  width: 100%;
  padding: 20px;
  text-align: center;
  font-family: var(--bodyFont);
  & > * {
    display: block;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 600px) {
    text-align: center;
  }
`
const ExternalLink = styled.a`
  color: var(--linkColor);
  font-family: var(--linkFont);

  &:hover {
    text-decoration: var(--linkDecoration);
  }
`

function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <Header shopName="jamo store" />
        <MainSection>{children}</MainSection>
        <FooterStyled>
          <SocialLinks />
          <strong>
            Built by{' '}
            <ExternalLink
              href="https://stordahl.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jacob Stordahl
            </ExternalLink>
          </strong>
          <strong>
            Contribute to this open source project on{' '}
            <ExternalLink
              href="https://github.com/stordahl/gatsby-snipcart-sanity"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </ExternalLink>
          </strong>
        </FooterStyled>
      </PageWrapper>
    </>
  )
}
export default Layout
