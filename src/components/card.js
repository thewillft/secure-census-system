

export default function Card({ title, subtitle, body }) {
    return (
        <div className="p-3 bg-white rounded border border-2">
            <div className="mb-3">
                <h1 className="text-lg">
                    {title}
                </h1>
                <h2 className="text-sm text-gray-500">
                    {subtitle}
                </h2>
            </div>
            <div>
                {body}
            </div>
        </div>
    )
}