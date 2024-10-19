
export const Navbar = (): JSX.Element => {
    return (
        <div>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg bg-dark">
                    <div className="container" style={{maxWidth: 1470}}>
                        <a className="navbar-brand text-white" href="/" style={{fontWeight: "bold"}}>FORMOTEX</a>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: 220 }}>
                                <button className="btn btn-secondary">Inicio sesión</button>
                                <button className="btn btn-secondary">Registro</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    )
}
