import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { routes } from './lib/routes'

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
      <App />
    </StaticRouter>,
  )
}
