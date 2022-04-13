import { ButtonLink } from 'src/components/ui/Button'
import UIHero, {
  HeroContent,
  HeroImage,
  HeroLink,
} from 'src/components/ui/Hero'
import Icon from 'src/components/ui/Icon'
import Image from 'src/components/ui/Image/Image'

import Section from '../Section'

type Variant = 'default' | 'small'

interface HeroProps {
  title: string
  subtitle: string
  variant?: Variant
  linkText?: string
  link?: string
  icon?: JSX.Element
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
    <Section>
      <UIHero data-hero-variant={variant}>
        <HeroImage>
          <Image
            preload
            loading="eager"
            src={imageSrc}
            alt={imageAlt}
            width={360}
            height={240}
            sizes="(max-width: 768px) 70vw, 50vw"
          />
        </HeroImage>
        <HeroContent aria-labelledby="hero-heading">
          <div data-hero-wrapper className="layout__content">
            <div data-hero-info>
              <h1 id="hero-heading">{title}</h1>

              <p data-hero-text-body>{subtitle}</p>
              {!!link && (
                <HeroLink>
                  <ButtonLink to={link} inverse>
                    {linkText} <Icon name="ArrowRight" width={24} height={24} />
                  </ButtonLink>
                </HeroLink>
              )}
            </div>
            {!!icon && <div data-hero-icon>{icon}</div>}
          </div>
        </HeroContent>
      </UIHero>
    </Section>
  )
}

export default Hero
