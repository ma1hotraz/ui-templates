import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { Sidebar } from '../sidebar/index'
import ThemePicker from '../../components/theme-picker'
import { useColorPalates } from '../theme-provider/hooks'
import { component } from './../../../app.config.json'
const { navbar } = component

const Navbar: React.FC = () => {
  const theme = useColorPalates()
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen) // Toggle sidebar state
  }

  return (
    <>
      <AppBar position="static" sx={{ background: theme.primary.dark }}>
        <Toolbar
          style={{ display: 'flex-start', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {navbar.showHamburgerMenu && (
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
            )}
            {navbar.showHomeIcon && (
              <div>
                <IconButton
                  color="primary"
                  size="large"
                  edge="start"
                  aria-label="home"
                  style={{ fontSize: '2rem', height: '48px' }}
                >
                  <HomeIcon />
                </IconButton>
                {navbar.leftHomeIcon && (
                  <img
                    src={navbar.leftHomeIcon.src}
                    alt={`Left Home Icon ${navbar.leftHomeIcon.id}`}
                    style={{ maxHeight: '48px' }}
                  />
                )}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            {navbar.logos.showCenterLogos &&
              navbar.logos.centerLogoIcons.map((logo) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={`Logo ${logo.id}`}
                  style={{ maxHeight: '48px' }}
                />
              ))}

            {navbar.brandName && (
              <Typography
                variant="h6"
                color="inherit"
                sx={{ marginTop: 1, fontSize: '1.5rem' }}
              >
                {navbar.brandName}
              </Typography>
            )}
          </div>

          {navbar.logos.showRightLogos && (
            <div>
              {navbar.logos.rightLogoIcons.map((logo) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={`Right Logo ${logo.id}`}
                  style={{ maxHeight: '48px' }}
                />
              ))}
            </div>
          )}
          <ThemePicker />
        </Toolbar>
      </AppBar>

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </>
  )
}

export default Navbar
