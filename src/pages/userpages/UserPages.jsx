import {Route, Switch, Redirect , useLocation} from 'react-router-dom';

import DashBoard from "../dashboard/Dashboard.jsx";
import PageTemplate from "../../components/pagetemplate/PageTemplate";
import PurchaseEntry from '../purchaseEntry/PurchaseEntry.jsx';
import PrivateRoute from '../../components/privateroute/PrivateRoute.jsx';
import AddCategory from '../addcategory/AddCategory.jsx';
import AddProduct from '../addproduct/AddProduct.jsx';
import SalesEntry from '../salesEntry/SalesEntry.jsx';
import Inventory from '../inventory/Inventory.jsx';
import Report from '../report/Report.jsx';
import SingleSale from '../singlesale/SingleSale.jsx';
import SinglePurchase from '../singlepurchase/SinglePurchase.jsx';


function UserPages(props) {
  const loc = useLocation();
  const navItems = [
    {
      path:'/user/dashboard',
      icon:'tachometer-alt',
      name:'Dashboard'
    },
    {
      path:'/user/purchaseEntry',
      icon:'table',
      name:'Purchase Entry'
    },
    {
      path:'/user/salesEntry',
      icon:'table',
      name:'Sales Entry'
    },
    {
      path:'/user/reports',
      icon:'columns',
      name:'Reports'
    },
    {
      path:'/user/inventory',
      icon:'database',
      name:'Inventory'
    },
    {
      path:'/user/newProduct',
      icon:'plus-square',
      name:'New Product'
    },
    {
      path:'/user/newCategory',
      icon:'plus-circle',
      name:'New Category'
    }
  ];
  return (
  
    <PageTemplate currentPath ={loc.pathname} navItems = {navItems} user = {props.user} handleLogout = {props.handleLogout}>

    <Switch>
        <PrivateRoute exact path ='/user/dashboard' handleLogout={props.handleLogout} user={props.user} component={DashBoard}/>
        <PrivateRoute exact path ='/user/purchaseEntry' handleLogout={props.handleLogout} user={props.user} component={PurchaseEntry}/>
        <PrivateRoute exact path ='/user/newProduct' handleLogout={props.handleLogout} user={props.user} component={AddProduct}/>
        <PrivateRoute exact path ='/user/newCategory' handleLogout={props.handleLogout} user={props.user} component={AddCategory}/>
        <PrivateRoute exact path ='/user/salesEntry' handleLogout={props.handleLogout} user={props.user} component={SalesEntry}/>
        <PrivateRoute exact path ='/user/inventory' handleLogout={props.handleLogout} user={props.user} component={Inventory}/>
        <PrivateRoute exact path ='/user/reports' handleLogout={props.handleLogout} user={props.user} component={Report}/>
        <PrivateRoute exact path ='/user/salesEntry/:id' handleLogout={props.handleLogout} user={props.user} component={SingleSale}/>
        <PrivateRoute exact path ='/user/purchaseEntry/:id' handleLogout={props.handleLogout} user={props.user} component={SinglePurchase}/>
        <Route render={()=>(<Redirect to="/404"/>)}/>
    </Switch>
    </PageTemplate>
  
   
  );
}

export default UserPages;
