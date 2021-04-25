import hairgirl from '../../Assets/hairgirl.png';
import './LoginPage.css';

const Login = () => {

    return (

        <div className="login">

            <div className="info">

                <div className="text">

                    <h1>Are You in a Dire Need of a Haircut?</h1>
                    
                    <p>During the pandemic, it has become difficult to find open barbershops.</p>
                    <p>With 'Find My Barber,' you can find a barber shops that meet your hair cutting Preferences all while being close to home.</p>
                    <p>You can allow the app to use your location to find barbers around you or you can just use the nearest city you are in!</p>

                </div>

                <div className="links">

                    <a href="/main">Find a Barber</a>

                </div>


            </div>

            <div className="image">
                
                <img src={hairgirl} />

            </div>


        </div>


    )

}

export default Login;
