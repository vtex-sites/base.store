import React from 'react'
import type { ReactNode } from 'react'
import UIHero, {
  HeroContent,
  HeroImage,
  HeroLink,
} from 'src/components/ui/Hero'
import Image from 'src/components/ui/Image/Image'
import { LinkButton } from 'src/components/ui/Button'
import IconSVG from 'src/components/common/IconSVG'

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
          <div className="hero-content-info">
            <h1
              id="hero-heading"
              className={
                variant === 'default' ? 'title-hero' : 'title-hero-small'
              }
            >
              {title}
            </h1>

            <p className="text-body-big">{subtitle}</p>
            {!!link && (
              <HeroLink>
                <LinkButton to={link} inverse>
                  {linkText}{' '}
                  <IconSVG
                    name="ArrowRightDarkBlue"
                    width="24px"
                    height="24px"
                    loading="eager"
                  />
                </LinkButton>
              </HeroLink>
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
          // reset gatsby image default style
          style={{
            overflow: undefined,
            position: undefined,
          }}
          // for mobile load 100vw image, for desktop load half img
          sizes="(max-width: 768px) 100vw, 53vw"
        />
      </HeroImage>
    </UIHero>
  )
}

export default Hero
