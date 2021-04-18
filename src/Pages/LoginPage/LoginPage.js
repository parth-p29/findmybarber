import Title from '../../Components/Title/Title'
import './LoginPage.css'

const Login = () => {

    const image_url = "https://www.menshairstylestoday.com/wp-content/uploads/2020/07/How-Much-Do-Barbers-Make.jpg"
    const text1 = "During quarantine many people had to face the reality of living with their overgrown hair...  Many favourite barber shops had to shut down, resulting in a diere need of a haircut."
    const text2 = "Finding open barber shops that were good became a challange. So, this app will help you find great places to cut your hair that are also nearby!"

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (

        <div className="login">

            <Title text1={text1} text2={text2} />

            <img src={image_url} />

            <div className="button">

                <a href="/main">Start</a>

            </div>

        </div>


    )

}

export default Login;
