import React from 'react'
import { Container } from 'shards-react'
import "../assets/authlayout.css"

const AuthLayout = ({children}) => {
    return (
        <Container fluid className="background-div">
                    <div className="containerElement" >
                        {children}
                    </div>
        </Container>
    )
}

export default AuthLayout