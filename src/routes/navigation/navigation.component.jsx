import { Link, Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'

import './navigation.styles.scss';

const Navigation = () => {
  return (
      <Fragment>
         <div className="navigation">
            <Link className="logo-container" to='/'> 
               <CrwnLogo  className="logo" />
            </Link>
            <div className="links-container">
               <Link className="nav-link" to='/shop'>
                 SHOP
               </Link>
               <Link className="nav-link" to='/shop'>
                 CONTACT
               </Link>
            </div>
         </div>
         <Outlet />
      </Fragment>
  )
}

export default Navigation;