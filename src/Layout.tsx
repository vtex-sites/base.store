import { lazy, Suspense } from 'react'
import Alert from 'src/components/common/Alert'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import Toast from 'src/components/common/Toast'
import RegionalizationBar from 'src/components/regionalization/RegionalizationComponents'
import RegionalizationModal from 'src/components/regionalization/RegionalizationModal'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'
import { useRegionalization } from 'src/components/regionalization/RegionalizationProvider'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart } = useUI()
  const { isModalOpen, setIsModalOpen } = useRegionalization()

  return (
    <>
      <div id="layout">
        <Alert>
          Get 10% off today:&nbsp;<span>NEW10</span>
        </Alert>

        <Navbar />

        <main>
          <RegionalizationBar classes="display-mobile" />
          {children}
        </main>

        <Footer />

        <Toast />

        {displayMinicart && (
          <Suspense fallback={null}>
            <CartSidebar />
          </Suspense>
        )}
      </div>
      <RegionalizationModal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default Layout
