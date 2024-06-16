import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <nav className='flex items-center justify-center h-14 bg-red-300'>
            <Link>
                <img src={logo} alt="logo" />
            </Link>
        </nav>
    )
}

export default Navbar