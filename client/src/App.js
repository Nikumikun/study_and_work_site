import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import { Context } from './index';
import Footer from './components/Footer';

const App = observer(() => {
  const {user,task} = useContext(Context)
  const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(()=>{
            check(localStorage.token).then(data => {
            }).finally(()=> setLoading(false))
        },1000)
    }, []);

  if (loading)
  {
      return <Spinner animation={"grow"} variant={"warning"}/>
  }

    return (
    <BrowserRouter>
        <NavBar />
        <section className={'page'}>
          <AppRouter />
        </section>
    </BrowserRouter>
    
  );
})

export default App;
