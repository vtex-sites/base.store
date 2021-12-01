import { Link } from 'gatsby'
import React from 'react'
import Logo from 'src/components/ui/Logo'

const links = [
  { href: '/women', name: 'Women' },
  { href: '/men', name: 'Men' },
]

function Navlinks() {
  return (
    <nav>
      <Link className="m-1" to="/">
        <Logo />
      </Link>
      {links.map(({ href, name }) => (
        <Link className="m-1" key={href} to={href}>
          {name}
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
