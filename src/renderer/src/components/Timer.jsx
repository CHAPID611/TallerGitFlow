import { useState } from 'react'
import InputField from './InputField'

export default function Timer() {
  const [isEditing, setIsEditing] = useState(true)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center">
          <div>
            <InputField
              label="Horas"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
            />
            <InputField
              label="Minutos"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
            />
            <InputField
              label="Segundos"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
            />
            <button className="bg-blue-500 text-stone-200 px-20 py-1 rounded-xl text-xl mt-1 ml-1">
              &#10004;
            </button>
          </div>
        </div>
      ) : (
        <div>HH:MM:SS</div>
      )}
    </div>
  )
}
