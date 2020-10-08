import {  Route, Redirect, Switch} from 'react-router-dom'
import {adminRoutes} from './routes'
import React from 'react'
import Frame from './components/Frame/index'
import './App.css'
function App() {
  return (
    <Frame>
       <Switch>
               {adminRoutes.map(route=>{
                return <Route key={route.path} path={route.path} exact={route.exact}
                render={routeProps=>{
                  return <route.component {...routeProps}/>
                }}/>
              })}
              <Redirect to="/404"/>
            </Switch>
    </Frame>
  )
}

export default App
