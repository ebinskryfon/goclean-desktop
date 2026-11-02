export function LogoMark({ size = 28 }: { size?: number }) {
  return <img src={`${import.meta.env.BASE_URL}logo-mark.png`} width={size} height={size} alt="" aria-hidden="true" className="select-none" />
}

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="text-[1.15rem] font-semibold tracking-tight text-fg">goclean</span>
    </span>
  )
}
