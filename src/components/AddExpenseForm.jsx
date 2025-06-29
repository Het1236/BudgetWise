//react imports
import React, { useEffect, useRef } from 'react'

//library imports
import { PlusCircleIcon } from '@heroicons/react/24/solid'

// rrd imports
import { useFetcher } from 'react-router-dom'

const AddExpenseForm = ({ budgets }) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef()
    const focusRef = useRef()

    useEffect(()=>{
        if(!isSubmitting){
            //clear form
            formRef.current.reset()
            // rese form
            focusRef.current.focus()

        }
    },[isSubmitting])

  return (
    <div className='form-wrapper'>
        <h2 className="h3">Add New {' '} <span className='accent'>
            {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`} 
            </span>{" "}
        Expenses    
        </h2>
        <fetcher.Form
        method='post'
        className='grid-sm'
        ref={formRef}>
            <div className="expense-inputs">
                <div className="grid-xs">
                    <label htmlFor="newExpense">Expense Name</label>
                    <input 
                    type="text" 
                    name='newExpense'
                    id='newExponse'
                    placeholder='e.g., Coffee'
                    ref={focusRef}
                    required
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newExpenseAmount">Amount
                    </label>
                    <input 
                    type="number"
                    step="0.01"
                    inputMode='decimal'
                    name='newExpenseAmount'
                    id='newExpenseAmount'
                    placeholder='e.g., 3.50'
                    required />
                </div>
            </div>
            <div className="grid-xs" hidden={budgets.length === 1}>
                <label htmlFor="newExpenseBudget">
                    budget Category
                </label>
                <select
                 name="newExpenseBudget" 
                 id="newExpenseBudget"
                 required>
                    {
                        budgets
                        .sort((a,b)=> a.createdAt - b.createdAt)
                        .map((budget)=>{
                            return(
                                <option
                                key ={budget.id}
                                 value={budget.id}>
                                    {budget.name}
                                 </option>
                            )
                        })
                    }

                 </select>
            </div>
            <input 
            type="hidden" 
            name='_action' 
            value="createExpense"
            />
            <button 
        type="submit" 
        className='btn btn--dark'
        disabled={isSubmitting}>
           {
            isSubmitting ? <span>Creating Budget...</span> : (
                <>
                
                <span>Add Expense</span>
                <PlusCircleIcon width={25}/>
                </> 
                )
           }
        </button>

        

        </fetcher.Form>
      

    </div>
  )
}

export default AddExpenseForm
