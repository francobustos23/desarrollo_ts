import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = (): JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                name,
                email,
                password,
            });

            if (response.status === 200) {
                alert('Inicio de sesión exitoso');
                navigate('/landing');
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            alert('Error al iniciar sesión, verifica tus credenciales');
        }
    };

    return (
        <div>
            <section>
                <div className="card-container" style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
                    <div className="card text-center bg-dark" style={{ width: 600, height: 520 }}>
                        <h3 className="text-white mt-4" style={{ fontWeight: "bold" }}>Inicio Sesión</h3>
                        <p className="text-white mt-4">Nombre de Usuario</p>
                        <div className="input-group mt-2">
                            <input
                                type="text"
                                className="form-control mx-5"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                            />
                        </div>
                        <p className="text-white mt-4">Correo Electronico</p>
                        <div className="input-group mt-2">
                            <input
                                type="email"
                                className="form-control mx-5"
                                placeholder="example@gmail.com"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <p className="text-white mt-4">Password</p>
                        <div className="input-group mt-2">
                            <input
                                type="password"
                                className="form-control mx-5"
                                placeholder="**********"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="mt-3">
                            <p className="text-white">¿Todavia no tienes una cuenta? ingresa al link: <a href="#">registro</a></p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button
                                className="btn btn-secondary"
                                style={{ width: 100, height: 40 }}
                                onClick={handleLogin}  
                            >
                                Iniciar
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
