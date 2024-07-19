

export default function Input({ label, name, id, value, onChange, disabled }) {
    return (
        <div className="flex flex-col">
            <label className="mb-1">
                {label}
            </label>
            <input 
                className="px-1 border-2 rounded shadow-inner"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}