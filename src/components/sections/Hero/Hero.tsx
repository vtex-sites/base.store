import { Link } from 'gatsby'
import React from 'react'
import UIHero, {
  HeroContent,
  HeroImage,
  HeroLink,
} from 'src/components/ui/Hero'
import Image from 'src/components/ui/Image/Image'

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
        <div>
          <h1 id="hero-heading">{title}</h1>
          <p>{subtitle}</p>
        </div>
        <HeroLink>
          <Link to={link}>{linkText}</Link>
        </HeroLink>
      </HeroContent>
      <HeroImage>
        <Image
          baseUrl={imageSrc}
          alt={imageAlt}
          sourceWidth={720}
          aspectRatio={2}
          width={800}
          breakpoints={[480, 540, 720]}
          layout="constrained"
          backgroundColor="#f0f0f0"
          options={{
            fitIn: true,
          }}
        />
      </HeroImage>
    </UIHero>
  )
}

export default Hero
