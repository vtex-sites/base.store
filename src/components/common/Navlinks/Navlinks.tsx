import { Link } from 'gatsby'
import React from 'react'
import Logo from 'src/components/ui/Logo'

const links = [
  {
    href: '/apparel-and-accesories',
    name: 'Apparel',
  },
  {
    href: '/office',
    name: 'Office',
  },
]

function Navlinks() {
  return (
    <nav>
      <Link to="/">
        <Logo />
      </Link>
      {links.map((x) => (
        <Link key={x.href} to={x.href}>
          {x.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
