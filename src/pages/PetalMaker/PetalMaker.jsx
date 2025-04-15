import React from 'react'
import "./PetalMaker.scss"
import PersonalCalendar from '../../Components/PersonalCalendar/PersCalendar'
import BuketCreator from '../../Components/buket/BuketCreator'

function PetalMaker() {
  return (
    <div className="container">
    <div className="">
      <BuketCreator/>
      <PersonalCalendar/>
    </div>
  </div>
  )
}

export default PetalMaker
