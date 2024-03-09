import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GetAllSchedulesComponent from './components/GetAllSchedules'
import GetAllFarmersComponent from './components/GetAllFarmers'
import CalculateBillComponent from './components/CalculateBill'

function App() {

  return (
    <div className="App">
      <GetAllSchedulesComponent></GetAllSchedulesComponent>
      <GetAllFarmersComponent></GetAllFarmersComponent>
      <CalculateBillComponent></CalculateBillComponent>

    </div>
  )
}

export default App
