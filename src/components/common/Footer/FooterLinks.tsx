import React, { useState, useEffect } from 'react'
import {
  Icon as UIIcon,
  List as UIList,
  Accordion as UIAccordion,
  AccordionItem as UIAccordionItem,
  AccordionButton as UIAccordionButton,
  AccordionPanel as UIAccordionPanel,
} from '@faststore/ui'
import {
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
} from 'phosphor-react'

import Link from '../../ui/Link'
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
        <UIAccordion indices={indicesExpanded} onChange={onChange}>
          {links.map((section, index) => (
            <UIAccordionItem key={section.title}>
              <UIAccordionButton className="title-subsection">
                {section.title}
                <UIIcon
                  component={
                    indicesExpanded.has(index) ? (
                      <MinusCircleIcon size={24} />
                    ) : (
                      <PlusCircleIcon size={24} />
                    )
                  }
                />
              </UIAccordionButton>
              <UIAccordionPanel>
                <UIList>
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link variant="footer" href={item.href}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </UIList>
              </UIAccordionPanel>
            </UIAccordionItem>
          ))}
        </UIAccordion>
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
