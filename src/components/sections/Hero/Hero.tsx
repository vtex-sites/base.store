import React from 'react'
import UIHero, {
  HeroContent,
  HeroImage,
  HeroLink,
} from 'src/components/ui/Hero'
import Image from 'src/components/ui/Image/Image'
import { ArrowRight as ArrowRightIcon } from 'phosphor-react'
import { LinkButton } from 'src/components/ui/Button'

interface HeroProps {
  title: string
  subtitle: string
  linkText: string
  link: string
  imageSrc: string
  imageAlt: string
}

const Hero = ({
  title,
  subtitle,
  linkText,
  link,
  imageAlt,
  imageSrc,
}: HeroProps) => {
  return (
    <UIHero>
      <HeroContent aria-labelledby="hero-heading">
        <div className="banner-info-content / grid-content">
          <div>
            <h1 id="hero-heading" className="title-hero">
              {title}
            </h1>
            <p className="text-body-big">{subtitle}</p>
          </div>
          <HeroLink>
            <LinkButton href={link} inverse>
              {linkText} <ArrowRightIcon size={24} />
            </LinkButton>
          </HeroLink>
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
