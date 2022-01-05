import React, { useState } from 'react'
import {
  Link,
  Icon,
  List,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@faststore/ui'
import { PlusCircle as PlusCircleIcon } from 'phosphor-react'

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
  const [indices, setIndices] = useState<Set<number>>(new Set([]))
  const onChange = (index: number) => {
    if (indices.has(index)) {
      indices.delete(index)
      setIndices(new Set(indices))
    } else {
      setIndices(new Set(indices.add(index)))
    }
  }

  // TODO: Verify if the screen is a desktop or mobile and change it here
  const screen = 'mobile'

  return (
    <section className="footer__links">
      {screen === 'mobile' ? (
        <Accordion indices={indices} onChange={onChange}>
          {links.map((section) => (
            <AccordionItem key={section.title}>
              <AccordionButton className="title-subsection">
                {section.title}
                <Icon component={<PlusCircleIcon size={18} />} />
              </AccordionButton>
              <AccordionPanel>
                <List>
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.name}>{item.name}</Link>
                    </li>
                  ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="footer__links-columns">
          {links.map((section) => (
            <div key={section.title}>
              <p className="title-sub-subsection">{section.title}</p>
              <List>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.name}>{item.name}</Link>
                  </li>
                ))}
              </List>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default FooterLinks
