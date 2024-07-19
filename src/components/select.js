

export default function Select({ label, name, id, options, value, onChange, disabled }) {
    return (
        <div className="flex flex-col">
            <label className="mb-1">
                {label}
            </label>
            <select 
                className="px-1 py-0.5 border-2 rounded shadow-inner"
                name={name}
                id={id}
                onChange={onChange}
                value={value}
                disabled={disabled}
            >
                {options && options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}