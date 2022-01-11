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
    <nav className="flex items-center justify-around min-h-[48px] w-full sm:w-fit">
      <Link className="m-1" to="/">
        <Logo />
      </Link>
      {links.map((x) => (
        <Link className="m-1" key={x.href} to={x.href}>
          {x.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
