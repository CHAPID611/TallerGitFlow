import { useState, useEffect } from 'react'
import InputField from './InputField'

export default function Timer() {
  const [isEditing, setIsEditing] = useState(true)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [isCountingUp, setIsCountingUp] = useState(true)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (isCountingUp) {
            return prevTime + 1
          } else {
            if (prevTime <= 0) {
              setIsRunning(false)
              return 0
            }
            return prevTime - 1
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isCountingUp])

  const startTimer = () => {
    if (isEditing) {
      const initialTime = hours * 3600 + minutes * 60 + seconds
      setTime(initialTime)
      setIsCountingUp(initialTime === 0)
      setIsEditing(false)
      setIsRunning(true)
    }
  }

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center">
          <div>
            <InputField
              label="Horas"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            />
            <InputField
              label="Minutos"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            />
            <InputField
              label="Segundos"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            />
            <button 
              onClick={startTimer}
              className="bg-blue-500 hover:bg-blue-600 text-stone-200 px-20 py-1 rounded-xl text-xl mt-1 ml-1 transition-colors"
            >
              Iniciar
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-6xl font-mono mb-4">{formatTime(time)}</div>
        </div>
      )}
    </div>
  )
}
