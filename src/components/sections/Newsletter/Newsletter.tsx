import type { ComponentPropsWithRef, FormEvent, ReactNode } from 'react'
import React, { forwardRef, useRef } from 'react'
import { Form, Label, Input, Button } from '@faststore/ui'

export interface NewsletterProps
  extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  /**
   * Heading for the section.
   */
  heading: ReactNode
  /**
   * Description about the newsletter.
   */
  description?: ReactNode
  /**
   * Callback function when submitted.
   */
  onSubmit: (value: string) => void
}

const Newsletter = forwardRef<HTMLFormElement, NewsletterProps>(
  function Newsletter({ heading, description, onSubmit, ...otherProps }, ref) {
    const emailInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault()

      if (emailInputRef.current?.value !== '') {
        onSubmit(emailInputRef.current!.value)
      }
    }

    return (
      <Form
        data-store-newsletter
        ref={ref}
        onSubmit={handleSubmit}
        {...otherProps}
      >
        <div data-newsletter-content>
          {heading}
          {Boolean(description) && description}
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
    )
  }
)

export default Newsletter

/*
Example of use:
<Newsletter
  heading={
    <h3>
      <EnvelopIcon size={16}
      Get news and special offers
    </h3>
  }
  description={
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
