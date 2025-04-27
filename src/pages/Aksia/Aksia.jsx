import React, { useState, useEffect } from 'react'
import "./Aksia.scss"
import Aksy from '../../Components/Aksy/Aksy'

function Aksia() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

 
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);

  const calculateTimeLeft = () => {
    const difference = +deadline - +new Date()
    
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60))
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getCurrentTime = () => {
    const now = new Date()
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hoursAngle = (time.hours % 12) * 30 + time.minutes * 0.5
  const minutesAngle = time.minutes * 6 + time.seconds * 0.1
  const secondsAngle = time.seconds * 6

  return (
    <div>
      <div className="flower-banner">
        <div className="content-wrapper container">
          <div className="text-content">
            <h1 className="main-title animate-pop">
              <span className="special-offer">Спецпредложение!</span>
              <span className="discount">50%</span> Скидка
            </h1>

            <div className="features">
              <div className="feature-item animate-slide">
                <div className="icon">🌹</div>
                <p>Эксклюзивные букеты<br />по специальным ценам</p>
              </div>

              <div className="feature-item animate-slide">
                <p>Время идет — не теряй шанс!<br /> Скидка действует до конца акции — не упусти!</p>
              </div>
            </div>

            <button className="cta-button animate-pulse">
              Время уходит — закажи сейчас! 🌸
            </button>
          </div>

          <div className="clock-wrapper">
            <div className="analog-clock">
              <div className="clock-face">
                {[...Array(12)].map((_, index) => {
                  const angle = (index + 1) * 30
                  return (
                    <div
                      key={index}
                      className="number"
                      style={{
                        transform: `rotate(${angle}deg) translateX(-50%)`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <span style={{ transform: `rotate(-${angle}deg)` }}>
                        {index + 1}
                      </span>
                    </div>
                  )
                })}
                <div className="hand hour" style={{ transform: `rotate(${hoursAngle}deg)` }} />
                <div className="hand minute" style={{ transform: `rotate(${minutesAngle}deg)` }} />
                <div className="hand second" style={{ transform: `rotate(${secondsAngle}deg)` }} />
                <div className="center" />
              </div>
            </div>
            <div className="current-time animate-fade">
              {time.hours.toString().padStart(2, '0')}:
              {time.minutes.toString().padStart(2, '0')}:
              {time.seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="timer-special">
  <h2 className="timer-title">
    До конца акции осталось ⏳
  </h2>

  <div className="timer-grid">
    {Object.entries(timeLeft).map(([label, value]) => (
      <div className="timer-box" key={label}>
        <div className="timer-number">
          {value.toString().padStart(2, '0')}
        </div>
        <span className="timer-label">
          {{
            days: 'Дней',
            hours: 'Часов',
            minutes: 'Минут',
            seconds: 'Секунд'
          }[label]}
        </span>
      </div>
    ))}
  </div>
</div>



      {/* Aksy компонентинен кийин же үстүндө таймер иштеп турат */}
      <Aksy />
    </div>
  )
}

export default Aksia
