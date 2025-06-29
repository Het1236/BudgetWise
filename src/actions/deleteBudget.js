//library imports
import { toast } from "react-toastify";

//helpers imports
import { deleteItem, getAllMatchingItems } from "../helpers";

//rrd imports
import { redirect } from "react-router-dom";

export function deleteBudget({params}) {
  try {
    deleteItem({
    key: "budgets",
    id: params.id
  })

  const associatedExpenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  
  })

  associatedExpenses.forEach((expense) => {
    deleteItem({
      key: "expenses",
      id: expense.id,
    })
  })

  toast.success("Budget deleted successfully")
  } catch (e){
    throw new Error("There was a problem deleting your budget.")
  }

  return redirect("/")

}