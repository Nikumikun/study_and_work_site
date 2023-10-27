import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import { Context } from '.';

const App = observer(() => {
  const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(()=>{
            check().then(data => {
            }).finally(()=> setLoading(false))
        },1000)
    }, []);

  if (loading)
  {
      return <Spinner animation={"grow"} />
  }

    return (
    <BrowserRouter>
        <NavBar />
        <AppRouter />
    </BrowserRouter>
  );
})

export default App;
