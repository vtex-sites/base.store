import React from 'react'

import Link from '../../ui/Link'

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
        <Link variant="display" key={x.href} href={x.href}>
          {x.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
