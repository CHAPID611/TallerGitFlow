import { useState, useEffect, useRef } from 'react'
import InputField from './InputField'

export default function Timer() {
  const [isEditing, setIsEditing] = useState(true)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const startTimer = () => {
    if (!isRunning) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds
      setTimeLeft(totalSeconds)
      setIsRunning(true)
      setIsEditing(false)
      
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const stopTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setIsEditing(true)
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setIsEditing(true)
    setHours(0)
    setMinutes(1)
    setSeconds(0)
    setTimeLeft(0)
  }

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    setIsEditing(false)
    setTimeLeft(hours * 3600 + minutes * 60 + seconds)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {isEditing ? (
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="space-y-4">
            <InputField
              label="Horas"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              min={0}
              max={23}
            />
            <InputField
              label="Minutos"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              min={0}
              max={59}
            />
            <InputField
              label="Segundos"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
              min={0}
              max={59}
            />
            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-6xl font-bold mb-8 font-mono">
            {formatTime(timeLeft)}
          </div>
          <div className="space-x-4">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Iniciar
              </button>
            ) : (
              <button
                onClick={stopTimer}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Detener
              </button>
            )}
            <button
              onClick={resetTimer}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </div>
  )
  
}
