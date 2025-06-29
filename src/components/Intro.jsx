import React from 'react'
import { Form } from 'react-router-dom'

//library
import { UserPlusIcon } from '@heroicons/react/24/solid'

//assets
import illustration from "../assets/illustration.jpg"

function Intro() {
  return (
    <div className='intro'>
      <div>
        <h1>
            Personal Budget & {' '}<span className='accent'>Expense Manager</span>
        </h1>
        <p>
          Track. Plan. Take Control of Your Spending.
         </p>
        <Form method='post'>
            <input 
            type="text" 
            name='userName' 
            required 
            placeholder='What is your name?' 
            aria-label='Your Name' 
            autoComplete='"given-name'
            />
            <input type="hidden" 
            name='_action' 
            value="newUser"
            />
            <button 
            type="submit" 
            className='btn btn--dark'
            >
                <span>Create Account</span>
                <UserPlusIcon width={20}/>

            </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with Money" width={600}/>
    </div>
  )
}

export default Intro
