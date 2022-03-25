import React, { useEffect } from 'react'
import { Modal as UIModal } from '@faststore/ui'
import PostalCodeInput from 'src/components/common/PostalCode'
import Link from 'src/components/ui/Link'
import Icon from 'src/components/ui/Icon'
import IconButton from 'src/components/ui/IconButton'
import useModal from 'src/sdk/ui/useModal'

import './regionalization-modal.scss'

interface RegionalizationModalProps {
  isOpen: boolean
  /**
   * This function is called whenever the user clicks outside
   * the modal content
   */
  onDismiss: () => void
}

function RegionalizationModal({
  isOpen,
  onDismiss,
}: RegionalizationModalProps) {
  const { fade, setFade, closeModal, layout } = useModal()

  useEffect(() => {
    if (isOpen) {
      setFade('in')

      // Avoids double scroll issue on the page
      layout?.classList.add('no-scroll')
    }

    return () => layout?.classList.remove('no-scroll')
  }, [isOpen, layout, setFade])

  const onTransitionEnd = () => {
    if (fade === 'out') {
      onDismiss()
    }
  }

  return (
    <UIModal
      data-regionalization-modal
      data-regionalization-modal-state={fade}
      isOpen={isOpen}
      onDismiss={(e) => {
        e.preventDefault()
        closeModal()
      }}
      onTransitionEnd={onTransitionEnd}
    >
      <header className="regionalization-modal__header">
        <IconButton
          onClick={closeModal}
          classes="regionalization-modal__button"
          aria-label="Close Regionalization Modal"
          data-testid="regionalization-modal-button-close"
          icon={<Icon name="X" width={30} height={30} />}
        />
        <p className="text__title-subsection" data-regionalization-modal-title>
          Set your location
        </p>
        <p className="text__body" data-regionalization-modal-description>
          Prices, offers and availability may vary according to your location.
        </p>
      </header>
      <div className="regionalization-modal__body">
        {/* TODO: Remove this div when PostalCodeInput be styled */}
        <div data-regionalization-modal-input>
          <PostalCodeInput />
        </div>
        <Link to="/">
          <span data-regionalization-modal-link>
            {"Don't know my Postal Code"}
          </span>
          <Icon name="ArrowSquareOut" width={18} height={18} />
        </Link>
      </div>
    </UIModal>
  )
}

export default RegionalizationModal
