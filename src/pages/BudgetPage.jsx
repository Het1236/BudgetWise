import React from 'react'

// rrd imports
import { useLoaderData } from 'react-router-dom';
//library imports
import { toast } from 'react-toastify';

//components imports
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';

//helpers
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers'
import Table from '../components/Table';

//loader
export async function budgetLoader({params}) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];
    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if(!budget){
        throw new Error("The budget you are trying to find doesn't exist")
    }

    return { budget, expenses }
}

//actions
export async function budgetAction({request}){
    const data = await request.formData();
    const {_action,...values} = Object.fromEntries(data)

    if(_action==="createExpense"){
        try{
          createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget
          })
          return toast.success(`Expense ${values.newExpense} created!`)
        }catch(e){
          throw new Error("There was a problem creating your expense")
        }
      }
      if(_action==="deleteExpense"){
        try{
          deleteItem({
            key: "expenses",
            id: values.expenseId,
          })
          return toast.success(`Expense deleted!`)
        }catch(e){
          throw new Error("There was a problem deleting your expense")
        }
      }
}



const BudgetPage = () => {
    const { budget, expenses } = useLoaderData()
  return (
    <div
    className='grid-lg'
    style={{
        "--accent": budget.color
    }}>
        <h1 className="h2">
            <span className="accent">{budget.name}</span>
             {' '} Overview
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete={true}/>
            <AddExpenseForm budgets={[budget]}/>
        </div>
        <div>
            {
                expenses && expenses.length>0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">
                                {budget.name} 
                            </span>
                            {' '}Expenses
                        </h2>
                        <Table expenses={expenses} showBudget ={false}/>
                    </div>
                )
            }
        </div>
      
    </div>
  )
}

export default BudgetPage
