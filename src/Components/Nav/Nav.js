import './Nav.css';
import logo from '../../Assets/barberlogo.png';

const Nav = () => {

    return (

        <nav>

            <div className="logo">

                <a href="/">
                    <img src={logo} />
                </a>
                
            </div>

            <div className="links">

                <a href="/">
                    About
                </a>
                
                <a href="https://github.com/parth-p29?tab=repositories" target="_blank">
                    Github
                </a>

            </div>

        </nav>

    );

}

export default Nav;