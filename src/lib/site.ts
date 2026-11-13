export const VERSION = 'v1.2.0'
export const REPO = 'https://github.com/skryfon'
export const PKG = 'https://pkg.go.dev/github.com/skryfon/gostrata'
export const INSTALL_CMD = 'go install github.com/skryfon/gostrata@latest'
export const INSTALL_SH = 'curl -fsSL https://raw.githubusercontent.com/skryfon/gostrata/main/install.sh | sh'
export const INSTALL_PS = 'irm https://raw.githubusercontent.com/skryfon/gostrata/main/install.ps1 | iex'
export const SETUP_REPO = 'https://github.com/skryfon'
const SETUP = `${SETUP_REPO}/releases/latest/download`
export const SETUP_FILES = {
  linux: `${SETUP}/gostrata-setup-linux.AppImage`,
  windows: `${SETUP}/gostrata-setup-windows.exe`,
  darwin: `${SETUP}/gostrata-setup-macos.dmg`,
} as const
export const SITE_URL = 'https://www.goclean.cloud'

/** Set to false to bring the full site back. */
export const MAINTENANCE = true
