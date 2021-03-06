// This is the template for each programmatically generated item in the shop. It will be populated by our Sanity Project.

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Product = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  align-items: center;
  width: max-content;
  margin: 0 auto;
  font-family: var(--bodyFont);
  & > div {
    margin: 1rem;
    width: 400px;
    max-width: 80vw;
    margin: 1rem;
  }
  & > div > label {
    margin-left: 0.5rem;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`

const Heading = styled.h1`
  font-weight: 900;
  font-size: 1.5em;
  margin: 20px 0;
  font-family: var(--subheadingFont);
  font-size: var(--subheadingSize);
  color: var(--subheadingColor);
`

const ImgStyled = styled(Img)`
  width: 400px;
  height: 400px;
  max-width: 80vw;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
`

const Price = styled.p`
  margin-bottom: 10px;
  padding: 10px;
  font-weight: 700;
  font-family: var(--bodyFont);
  color: var(--bodyColor);
  font-size: 2rem;
`

const Description = styled.p`
  margin-bottom: 20px;
  padding: 10px;
  font-family: var(--bodyFont);
  font-size: var(--bodySize);
  color: var(--bodyColor);
`

const Dropdown = styled.select`
  position: relative;
  display: block;
  padding: 10px;
  margin: 10px 0;
  font-weight: 700;
  font-family: var(--bodyFont);
  background: var(--bg);
  border: var(--border);
  border-radius: var(--borderRadius);
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:hover > option {
    color: var(--black);
  }
`

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    width: 150px;
    margin: 0.5rem;
  }
`

const DropdownOption = styled.option`
  padding: 20px;
  background: var(--bg);
  color: var(--bodyColor);
  font-family: var(--bodyFont);
  font-size: var(--bodySize);
  font-weight: 700;
  border: none;
  outline: none;
`

const BuyButton = styled.button`
  &:hover {
    transform: rotate(2deg);
  }
`

// find index of variant with digital verison
const isDigital = elem => elem.digital === true

export default class SingleItem extends React.Component {
  state = {
    item: this.props.data.item,
    selected: this.props.data.item.variants[0],
  }

  setSelected = value => {
    const index = this.props.data.item.variants.map(e => e.title)
    this.setState({
      selected: this.props.data.item.variants[index.indexOf(value)],
    })
  }

  // create the string required by snipcart to allow price changes based on option chosen
  createString = values => {
    //debugger
    console.log(values)
    const firstPrice = values[0].price
    const customVars = values
      .map((option, i) => {
        console.log(i)
        if (i == 0) {
          return `${option.title}`
        } else {
          const price =
            option.price > firstPrice
              ? `[+${parseInt(option.price - firstPrice).toFixed(2)}]`
              : `[-${parseInt(option.price - firstPrice) * -1}]`
          return `${option.title}${price}`
        }
      })
      .join("|")
    console.log(customVars)
    return customVars
  }
  // calculate price based on option selected for display on item page
  updatePrice = (basePrice, values) => {
    const selectedOption = values.find(
      option => option.title === this.state.selected
    )
    return (basePrice + selectedOption.priceChange).toFixed(2)
  }

  CarouselPage = selected => {
    console.log(selected.images)

    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
    }
    const carousel = selected.images.map((img, i) => (
      <ImgStyled fluid={img.asset.fluid} key={i} />
    ))
    console.log(carousel)
    return (
      <Slider {...settings} className="overflow-hidden">
        {carousel}
      </Slider>
    )
  }

  render() {
    const { item } = this.state
    const { selected } = this.state
    const { siteUrl } = this.props.data.site.siteMetadata
    const digitalVersion = item.variants.findIndex(isDigital)
    console.log(digitalVersion !== -1)
    const firstPrice = item.variants[0].price.toFixed(2)
    const ItemName = `${item.title} - ${selected.title}`
    let button
    if (digitalVersion !== -1) {
      button = (
        <BuyButton
          className="snipcart-add-item"
          data-item-id={item.id}
          data-item-price={firstPrice}
          data-item-name={ItemName}
          data-item-description={item.blurb.en}
          data-item-image={item.variants[0].images[0].asset.fluid.src}
          data-item-url={`${siteUrl}/product/${item.slug.current}`} // REPLACE WITH OWN URL
          data-item-custom1-name={item.variant_type}
          data-item-custom1-options={this.createString(item.variants)}
          data-item-custom1-value={selected.title}
          data-item-file-guid={item.variants[digitalVersion].guid}
        >
          Add to cart
        </BuyButton>
      )
    } else {
      button = (
        <BuyButton
          className="snipcart-add-item"
          data-item-id={item.id}
          data-item-price={firstPrice}
          data-item-name={ItemName}
          data-item-description={item.blurb.en}
          data-item-image={item.variants[0].images[0].asset.fluid.src}
          data-item-url={`${siteUrl}/product/${item.slug.current}`} // REPLACE WITH OWN URL
          data-item-custom1-name={item.variant_type}
          data-item-custom1-options={this.createString(item.variants)}
          data-item-custom1-value={selected.title}
        >
          Add to cart
        </BuyButton>
      )
    }
    return (
      <Product>
        <div>
          <Heading>{item.title}</Heading>
          {this.CarouselPage(selected)}
        </div>
        <div>
          <Price>${selected.price}</Price>
          <Description>{item.body.en[0].children[0].text}</Description>
          <label>{item.variant_type}</label>
          <InputWrap>
            {item.variants.length > 1 ? (
              <Dropdown
                id={item.title}
                onChange={e => this.setSelected(e.target.value)}
                value={this.state.selected.title}
              >
                {item.variants.map(option => (
                  <DropdownOption key={option.title}>
                    {option.title}
                  </DropdownOption>
                ))}
              </Dropdown>
            ) : (
              <div></div>
            )}
            {button}
          </InputWrap>
        </div>
      </Product>
    )
  }
}

export const pageQuery = graphql`
  query ItemBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    item: sanityProduct(slug: { current: { eq: $slug } }) {
      id
      title
      slug {
        current
      }
      blurb {
        en
      }
      body {
        en {
          children {
            text
          }
        }
      }
      variants {
        title
        grams
        price
        sku
        taxable
        digital
        guid
        images {
          asset {
            assetId
            description
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
      variant_type
    }
  }
`
