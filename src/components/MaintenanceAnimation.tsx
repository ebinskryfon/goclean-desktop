import { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

/** "Under maintenance" crane animation by Raghad Modallal (LottieFiles, Lottie Simple License). */
export function MaintenanceAnimation() {
  const [mounted, setMounted] = useState(false)
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    setMounted(true)
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return (
    <div role="img" aria-label="Construction crane working on the website" className="relative aspect-[14/5] w-full max-w-4xl overflow-hidden">
      {/* The artwork sits in the middle band of a square canvas, so scale up and crop the empty margins. */}
      <div className="absolute aspect-square" style={{ width: '114.3%', left: '-13.4%', top: '-83.5%' }}>
        {mounted && <DotLottieReact src={`${import.meta.env.BASE_URL}animations/maintenance.lottie`} loop autoplay={!reduce} />}
      </div>
    </div>
  )
}
