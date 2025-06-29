import React from 'react'
//assets
import logomark from "../assets/logomark.svg"

//library
import { TrashIcon } from '@heroicons/react/24/solid'

//rrd imports
import { Form, NavLink } from 'react-router-dom'


const Nav = ({ userName }) => {
    return (
        <nav>
            <NavLink
            to="/"
            aria-label="Go to home"
            >
                
                <img src={logomark} alt="" height={30} />
                <span>BudgetWise</span>
            </NavLink>
            {

            userName && (
                <Form
                method="post"
                action='/logout'
                onSubmit={(event) => {
                    if(!confirm("Delet user and all data?")){
                        event.preventDefault()
                    }
                }}>

                    <button type='submit' className='btn btn--warning'>
                        <span>Delet User</span>
                        <TrashIcon width={20}/>

                    </button>

                </Form>

            )
            }

        </nav>
    )
}

export default Nav
