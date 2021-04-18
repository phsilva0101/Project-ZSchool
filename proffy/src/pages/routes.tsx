import React from 'react'

import {BrowserRouter, Route} from 'react-router-dom'
import TeacherForms from './TeacherForms'
import TeacherList from './TeacherList'
import Landing from './Landing'

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForms} />
        </BrowserRouter>
    );
}

export default Routes;