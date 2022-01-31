import type { ComponentPropsWithRef, FormEvent, ReactNode } from 'react'
import React, { forwardRef, useRef } from 'react'
import { Form, Label, Input, Button } from '@faststore/ui'

export interface NewsletterProps
  extends Omit<ComponentPropsWithRef<'form'>, 'title' | 'onSubmit'> {
  /**
   * Title for the section.
   */
  title: ReactNode
  /**
   * A subtitle for the section.
   */
  subtitle?: ReactNode
  /**
   * Callback function when submitted.
   */
  onSubmit: (value: string) => void
}

const Newsletter = forwardRef<HTMLFormElement, NewsletterProps>(
  function Newsletter({ title, subtitle, onSubmit, ...otherProps }, ref) {
    const emailInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault()

      if (emailInputRef.current?.value !== '') {
        onSubmit(emailInputRef.current!.value)
      }
    }

    return (
      <section data-store-newsletter>
        <Form
          data-newsletter-form
          ref={ref}
          onSubmit={handleSubmit}
          {...otherProps}
        >
          <div data-newsletter-header>
            {title}
            {Boolean(subtitle) && subtitle}
          </div>

          <div data-newsletter-controls>
            <Label htmlFor="newsletter-email">Your email</Label>
            <Input
              id="newsletter-email"
              type="email"
              name="newsletter-email"
              ref={emailInputRef}
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </Form>
      </section>
    )
  }
)

export default Newsletter

/*
Example of use:
<Newsletter
  title={
    <h3>
      <EnvelopIcon size={16}
      Get news and special offers
    </h3>
  }
  subtitle={
    <p>
      Receive our news and promotions in advance. Enjoy and get 10% off
      your first purchase. For more information{' '}
      <Link to="/">click here</Link>.
    </p>
  }
  onSubmit={(email) => {
    alert(`Subscribing ${email} to the newsletter.`)
  }}
/>
 */
