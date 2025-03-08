// eslint-disable-next-line react/prop-types
export default function InputField({ label, value, onChange, placeholder, min, max }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (inputValue === '' || (/^\d+$/.test(inputValue) && parseInt(inputValue) >= (min || 0) && parseInt(inputValue) <= (max || Infinity))) {
      onChange(e)
    }
  }

  return (
    <div className="text-3xl mb-4">
      <label className="text-stone-200 mr-2">{label}:</label>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-20 bg-transparent text-blue-400 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
        onChange={handleInputChange}
      />
    </div>
  )
}
