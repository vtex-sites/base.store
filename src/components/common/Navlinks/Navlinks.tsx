import { Link } from 'gatsby'
import React from 'react'

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
    <nav className="navlinks">
      {links.map((x) => (
        <Link key={x.href} to={x.href}>
          {x.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
