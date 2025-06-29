import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

//layout
import Main, { mainLoader } from "./layouts/Main";

//library imports
import { ToastContainer } from 'react-toastify';

//actions
import { logoutAction } from "./actions/logout";
import {deleteBudget} from "./actions/deleteBudget";

let router = createHashRouter([
  {
   path: "/",
   element: <Main/>,
   loader: mainLoader,
   errorElement:<Error/>,
   children: [
     {
      index: true,
       path: "/",
       element: <Dashboard/>,
       loader: dashboardLoader,
       action: dashboardAction,
       errorElement:<Error/>
      },
      {
       path: "budget/:id",
       element: <BudgetPage/>,
       loader: budgetLoader,
      action: budgetAction,
       errorElement:<Error/>,
       children: [
        {
          path: "delete",
          action: deleteBudget,
        }
       ]
      },
      {
        path: "expenses",
        element: <ExpensesPage/>,
        loader: expensesLoader,
        action: expensesAction,
        errorElement:<Error/>
      },
      {
        path: "/logout",
        action: logoutAction,
        errorElement:<Error/>

     },
     {
       path: "/about",
       element: <h1>About</h1>,
       errorElement:<Error/>
     },
   ]
 },

  {
    path:"*",
    errorElement: <Error/>

  }
]);

function App() {


  return (
    <div className="App">
     <RouterProvider router={router} />
     <ToastContainer/>
    </div>
  )
}

export default App
