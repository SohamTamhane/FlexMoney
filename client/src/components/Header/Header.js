import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import { Context } from '../../utils/Context';

function Header(){

    const {loginInfo} = useContext(Context)

    const navigate = useNavigate();

    function handleLogOut(){
        navigate("/");
        window.location.reload();
    }

    return(
        <div className='header-main-div'>
            <div><Link  className="website-name" to={'/'}>FlexMoney</Link></div>
            <div className="header-links">
                <ul>
                    <li><Link className='nav-links' to={'/'}>Home Page</Link></li>
                    {loginInfo?.status ? 
                        <>
                            <li><Link className='nav-links' to={'/admission'}>Admission Form</Link></li>
                            <li><Link className='nav-links' onClick={handleLogOut}>Logout</Link></li>
                        </> :
                        <>
                            <li><Link className='nav-links' to={'/login'}>Login</Link></li>
                            <li><Link className='nav-links' to={'/signup'}>Signup</Link></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    )
}
export default Header;