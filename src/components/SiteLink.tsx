import { Link as RouterLink, NavLink as RouterNavLink, Navigate as RouterNavigate, type LinkProps, type NavLinkProps, type NavigateProps } from 'react-router-dom'

/**
 * GitHub Pages serves /about as a 301 to /about/, so internal links use the
 * trailing-slash form to avoid a redirect hop. Hash and query are preserved.
 */
function withSlash<T extends string | object>(to: T): T {
  if (typeof to !== 'string' || !to.startsWith('/')) return to
  const i = to.search(/[?#]/)
  const path = i === -1 ? to : to.slice(0, i)
  const rest = i === -1 ? '' : to.slice(i)
  return (path.endsWith('/') ? to : `${path}/${rest}`) as T
}

export function Link({ to, ...props }: LinkProps) {
  return <RouterLink to={withSlash(to)} {...props} />
}

export function NavLink({ to, ...props }: NavLinkProps) {
  return <RouterNavLink to={withSlash(to)} {...props} />
}

export function Navigate({ to, ...props }: NavigateProps) {
  return <RouterNavigate to={withSlash(to)} {...props} />
}
