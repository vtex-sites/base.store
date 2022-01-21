import React, { useState, useEffect } from 'react'
import { List as UIList } from '@faststore/ui'

import Link from '../../ui/Link'
import Accordion, { AccordionItem } from '../../ui/Accordion'
import useWindowDimensions from './useWindowDimensions'

const links = [
  {
    title: 'Our company',
    items: [
      {
        href: '/',
        name: 'About Us',
      },
      {
        href: '/',
        name: 'Our Blog',
      },
      {
        href: '/',
        name: 'Stores',
      },
      {
        href: '/',
        name: 'Work With Us',
      },
    ],
  },
  {
    title: 'Orders & Purchases',
    items: [
      {
        href: '/',
        name: 'Check Order Status',
      },
      {
        href: '/',
        name: 'Returns and Exchanges',
      },
      {
        href: '/',
        name: 'Product Recall',
      },
      {
        href: '/',
        name: 'Gift Cards',
      },
    ],
  },
  {
    title: 'Support & Services',
    items: [
      {
        href: '/',
        name: 'Support Center',
      },
      {
        href: '/',
        name: 'Schedule a Service',
      },
      {
        href: '/',
        name: 'Contact Us',
      },
    ],
  },
  {
    title: 'Partnerships',
    items: [
      {
        href: '/',
        name: 'Affiliate Program',
      },
      {
        href: '/',
        name: 'Advertise with US',
      },
      {
        href: '/',
        name: 'Market Place',
      },
    ],
  },
]

function FooterLinks() {
  const [indicesExpanded, setIndicesExpanded] = useState<Set<number>>(
    new Set([])
  )

  const onChange = (index: number) => {
    if (indicesExpanded.has(index)) {
      indicesExpanded.delete(index)
      setIndicesExpanded(new Set(indicesExpanded))
    } else {
      setIndicesExpanded(new Set(indicesExpanded.add(index)))
    }
  }

  const [isMobile, setIsMobile] = useState<boolean>(false)

  const { width: screenWidth } = useWindowDimensions()

  useEffect(() => {
    if (!screenWidth) {
      return
    }

    // notebook breakpoint = 1280px (See breakpoints on styles/global.scss)
    setIsMobile(screenWidth < 1280)
  }, [screenWidth])

  return (
    <section className="footer__links">
      {isMobile ? (
        <Accordion expandedIndices={indicesExpanded} onChange={onChange}>
          {links.map((section, index) => (
            <AccordionItem
              isExpanded={indicesExpanded.has(index)}
              key={section.title}
              buttonLabel={section.title}
            >
              <UIList>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link variant="footer" href={item.href}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </UIList>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="footer__links-columns">
          {links.map((section) => (
            <nav key={section.title}>
              <p className="title-sub-subsection">{section.title}</p>
              <UIList>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link variant="footer" href={item.href}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </UIList>
            </nav>
          ))}
        </div>
      )}
    </section>
  )
}

export default FooterLinks
