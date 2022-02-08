import React from 'react'
import type { ReactNode } from 'react'
import UIHero, { HeroContent, HeroImage } from 'src/components/ui/Hero'
import { LinkButton } from 'src/components/ui/Button'
import Image from 'src/components/ui/Image/Image'
import { ArrowRight as ArrowRightIcon } from 'phosphor-react'

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
    <UIHero data-hero-variant={variant}>
      <HeroContent aria-labelledby="hero-heading">
        <div className="hero-content-wrapper / grid-content">
          <div className="hero-content-info / base-store">
            <h1 id="hero-heading" className="title-hero">
              {title}
            </h1>
            <p className="text-body-big">{subtitle}</p>
            {!!link && (
              <LinkButton href={link} variant="primary" inverse>
                {linkText} <ArrowRightIcon size={24} />
              </LinkButton>
            )}
          </div>
          {!!icon && <div className="hero-content-icon">{icon}</div>}
        </div>
      </HeroContent>
      <HeroImage>
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
      </HeroImage>
    </UIHero>
  )
}

export default Hero
