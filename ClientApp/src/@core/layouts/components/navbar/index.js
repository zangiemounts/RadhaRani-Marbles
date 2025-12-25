// ** React Imports
import { Fragment } from 'react'
import { Sun, Moon } from 'react-feather'
// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'

const ThemeNavbar = props => {
  // ** Props
    const { skin, setSkin, setMenuVisibility } = props
    const ThemeToggler = () => {
        if (skin === 'dark') {
            return <Sun className='ficon' onClick={() => setSkin('light')} />
        } else {
            return <Moon className='ficon' onClick={() => setSkin('dark')} />
        }
    }
  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
              <ThemeToggler />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
