export const VERSION = 'v1.1.1'
export const REPO = 'https://github.com/ebinskryfon/goclean'
export const PKG = 'https://pkg.go.dev/github.com/ebinskryfon/goclean'
export const INSTALL_CMD = 'go install github.com/ebinskryfon/goclean@latest'
export const INSTALL_SH = 'curl -fsSL https://raw.githubusercontent.com/ebinskryfon/goclean/main/install.sh | sh'
export const INSTALL_PS = 'irm https://raw.githubusercontent.com/ebinskryfon/goclean/main/install.ps1 | iex'
export const SETUP_REPO = 'https://github.com/ebinskryfon/goclean-installer'
const SETUP = `${SETUP_REPO}/releases/latest/download`
export const SETUP_FILES = {
  linux: `${SETUP}/goclean-setup-linux.AppImage`,
  windows: `${SETUP}/goclean-setup-windows.exe`,
  darwin: `${SETUP}/goclean-setup-macos.dmg`,
} as const
export const SITE_URL = 'https://www.goclean.cloud'
