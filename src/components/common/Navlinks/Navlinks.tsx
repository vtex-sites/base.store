import Link from 'next/link'
import React from 'react'
import Logo from 'src/components/ui/Logo'

const links = [
  {
    href: '/apparel',
    name: 'Apparel',
  },
  {
    href: '/food-and-beverage',
    name: 'Food and beverage',
  },
]

function Navlinks() {
  return (
    <nav>
      <Link href="/">
        <a className="m-1" href="/">
          <Logo />
        </a>
      </Link>
      {links.map((x) => (
        <Link key={x.href} href={x.href}>
          <a className="m-1" href={x.href}>
            {x.name}
          </a>
        </Link>
      ))}
    </nav>
  )
}

export default Navlinks
