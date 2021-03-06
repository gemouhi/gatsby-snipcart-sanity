import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

const IconsWrap = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0.25rem;
  }
  & > *:hover {
    opacity: 80%;
  }
`

library.add(fab)

export default function SocialLinks() {
  const { links } = useStaticQuery(graphql`
    query {
      links: allSanitySiteSettings {
        nodes {
          socialLinks {
            link
            name
            icon
            _key
          }
        }
      }
    }
  `)
  const linksArr = links.nodes[0].socialLinks

  return (
    <IconsWrap>
      {linksArr.map(elem => {
        return (
          <a href={elem.link} key={elem._key}>
            <FontAwesomeIcon icon={["fab", elem.icon]} size="lg" />
          </a>
        )
      })}
    </IconsWrap>
  )
}
