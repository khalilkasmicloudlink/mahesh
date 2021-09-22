import React from 'react'
import { BrowserRouter , Switch , Route } from 'react-router-dom'

import PrivateRoute from "./Auth/PrivateRoute";
import AdminRoute from "./Auth/adminRoute";
import InstituteRoute from "./Auth/InstituteRoute";
import Navigation from './Components/Navigation'
import Footer from './Components/footer'
import Home from './Components/Home'
import Login from './User/Login'
import Signup from './User/Signup'
import adminDashboard from './Admin/Dashboard'
import instDashboard from './Institute/Dashboard'
import Dashboard from "./User/userDashboard";
import AddCategory from "./Admin/Category";
import Profile from './User/Profile';
import UpdateCategory from './Admin/UpdateCategory';
import AddCourse from './Institute/AddCourse'
import ReadVideo from './Components/videoPlayer'
import AddVideo from "./video/AddVideo";
import Course from './course/singleCourse'


const Routes = () => {

    return (
        <BrowserRouter>
        <Navigation />
            <Switch>
                <Route path="/" exact component={Home}  />
               
                
                <Route path="/login" exact component={Login}  />
                <Route path="/signup" exact component={Signup}  />
                
                <Route path="/course/:courseId" exact component={Course} />
                <PrivateRoute path="/course/:courseId/video/:videoId" exact component={ReadVideo} />
                
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                
                <AdminRoute path="/admin/dashboard" exact component={adminDashboard} />
                 <AdminRoute path="/create/category" exact component={AddCategory} />
                 
                 
                
                
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                
                <InstituteRoute path="/institute/dashboard" exact component={instDashboard} />
                <InstituteRoute path="/create/course" exact component={AddCourse} />
                <InstituteRoute path="/video/create" exact component={AddVideo} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}


export default Routes;