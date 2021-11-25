import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'
import type { NavlinksQueryQuery } from '@generated/graphql'

function Navlinks() {
  const links = useStaticQuery<NavlinksQueryQuery>(graphql`
    query NavlinksQuery {
      allStoreCollection(limit: 2, filter: { type: { eq: Department } }) {
        nodes {
          slug
          seo {
            title
          }
        }
      }
    }
  `)

  return (
    <nav>
      {links.allStoreCollection.nodes.map((x) => (
        <Link className="p-4 pl-0" key={x.slug} to={`/${x.slug}`}>
          {x.seo.title}
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
