import React, { useState } from 'react'
import {
  Link,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@faststore/ui'

import { PlusButtonIcon } from './Icons'

function LinksList() {
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
  const screen = 'desktop'

  return (
    <section>
      {screen === 'desktop' ? (
        <>
          <div>
            <span>Our company</span>
            <Link href="/">About Us</Link>
            <Link href="/">Our Blog</Link>
            <Link href="/">Stores</Link>
            <Link href="/">Work With Us</Link>
          </div>
          <div>
            <span>Orders {'&'} Purchases</span>
            <Link href="/">Check Order Status</Link>
            <Link href="/">Returns and Exchanges</Link>
            <Link href="/">Product Recall</Link>
            <Link href="/">Gift Cards</Link>
          </div>
          <div>
            <span>Support {'&'} Services</span>
            <Link href="/">Support Center</Link>
            <Link href="/">Schedule a Service</Link>
            <Link href="/">Contact Us</Link>
          </div>
          <div>
            <span>Partnerships</span>
            <Link href="/">Affiliate Program</Link>
            <Link href="/">Advertise with US</Link>
            <Link href="/">Market Place</Link>
          </div>
        </>
      ) : (
        <Accordion indices={indices} onChange={onChange}>
          <AccordionItem>
            <AccordionButton>
              Our company <Icon component={<PlusButtonIcon />} />
            </AccordionButton>
            <AccordionPanel>
              <ul>
                <li>
                  <Link href="/">About Us</Link>
                </li>
                <li>
                  <Link href="/">Our Blog</Link>
                </li>
                <li>
                  <Link href="/">Stores</Link>
                </li>
                <li>
                  <Link href="/">Work With Us</Link>
                </li>
              </ul>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              Orders {'&'} Purchases <Icon component={<PlusButtonIcon />} />
            </AccordionButton>
            <AccordionPanel>
              <ul>
                <li>
                  <Link href="/">Check Order Status</Link>
                </li>
                <li>
                  <Link href="/">Returns and Exchanges</Link>
                </li>
                <li>
                  <Link href="/">Product Recall</Link>
                </li>
                <li>
                  <Link href="/">Gift Cards</Link>
                </li>
              </ul>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              Support {'&'} Services <Icon component={<PlusButtonIcon />} />
            </AccordionButton>
            <AccordionPanel>
              <ul>
                <li>
                  <Link href="/">Support Center</Link>
                </li>
                <li>
                  <Link href="/">Schedule a Service</Link>
                </li>
                <li>
                  <Link href="/">Contact Us</Link>
                </li>
              </ul>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              Support {'&'} Services <Icon component={<PlusButtonIcon />} />
            </AccordionButton>
            <AccordionPanel>
              <ul>
                <li>
                  <Link href="/">Affiliate Program</Link>
                </li>
                <li>
                  <Link href="/">Advertise with US</Link>
                </li>
                <li>
                  <Link href="/">Market Place</Link>
                </li>
              </ul>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </section>
  )
}

export default LinksList
