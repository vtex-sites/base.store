import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'
import Logo from 'src/components/ui/Logo'

import type { NavlinksQueryQuery } from './__generated__/NavlinksQuery.graphql'

const styles = {
  link: { margin: '5px' },
}

function Navlinks() {
  const links = useStaticQuery<NavlinksQueryQuery>(graphql`
    query NavlinksQuery {
      allStoreCollection(limit: 2) {
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
      <Link style={styles.link} to="/">
        <Logo />
      </Link>
      {links.allStoreCollection.nodes.map((x) => (
        <Link style={styles.link} key={x.slug} to={`/${x.slug}`}>
          {x.seo.title}
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
