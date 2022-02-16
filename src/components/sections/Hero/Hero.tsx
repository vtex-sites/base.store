import React from 'react'
import type { ReactNode } from 'react'
import { LinkButton } from 'src/components/ui/Button'
import Image from 'src/components/ui/Image/Image'
import { ArrowRight as ArrowRightIcon } from 'phosphor-react'

import './hero.scss'

type Variant = 'default' | 'small'

interface HeroProps {
  title: string
  subtitle: string
  variant?: Variant
  linkText?: string
  link?: string
  icon?: ReactNode
  imageSrc: string
  imageAlt: string
}

const Hero = ({
  title,
  subtitle,
  variant = 'default',
  linkText,
  link,
  icon,
  imageAlt,
  imageSrc,
}: HeroProps) => {
  return (
    <article data-store-hero data-hero-variant={variant}>
      <section data-hero-content aria-labelledby="hero-heading">
        <div className="grid-content" data-hero-wrapper>
          <div data-hero-info>
            <h1 id="hero-heading">{title}</h1>
            <p>{subtitle}</p>
            {!!link && (
              <LinkButton href={link} variant="primary" inverse>
                {linkText} <ArrowRightIcon size={24} />
              </LinkButton>
            )}
          </div>
          {!!icon && <div data-hero-icon>{icon}</div>}
        </div>
      </section>
      <div data-hero-image>
        <Image
          baseUrl={imageSrc}
          alt={imageAlt}
          aspectRatio={2}
          layout="fullWidth"
          backgroundColor="#f0f0f0"
          loading="eager"
          options={{
            fitIn: true,
          }}
        />
      </div>
    </article>
  )
}

export default Hero
