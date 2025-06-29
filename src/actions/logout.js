//rrd imports
import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../helpers";

//library
import { toast } from "react-toastify";

export async function logoutAction(){
    // delet the user
    deleteItem({
        key: "userName"
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })
    toast.success("You have deleted your account")

    //return redirect
    return redirect("/")
}