import React from 'react'
import "./PetalMaker.scss"
import PersonalCalendar from '../../Components/PersonalCalendar/PersCalendar'
import BuketCreator from '../../Components/buket/BuketCreator'

function PetalMaker() {
  return (
    
    <div>
      <BuketCreator/>
      <PersonalCalendar/>
  </div>
  )
}

export default PetalMaker
