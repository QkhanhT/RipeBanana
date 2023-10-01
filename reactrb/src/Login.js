import Form from './Form'

function Login() {
    return (
        <div>
            <section>
                <center>
                    <h1>RipeBanana</h1>
                    <h2>Log in</h2>
                </center>
            </section>
            <section>
                {Form()}
            </section>
            <section>
                <center>
                    <button>Login</button>
                </center>
            </section>
            <section>
                <center>
                    <p>New User? Sign Up</p>
                </center>
            </section>
        </div>
    );
}

export default Login;