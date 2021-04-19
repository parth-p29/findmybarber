import './Nav.css';
import logo from '../../Assets/barberlogo.png';

const Nav = () => {

    return (

        <nav>

            <div className="logo">

                <img src={logo} />
                
            </div>

            <div className="links">

                <a href="/main">Find Barbers</a>
                <a href="https://github.com/parth-p29?tab=repositories" target="_blank">Github</a>

            </div>

        </nav>


    );



}

export default Nav;