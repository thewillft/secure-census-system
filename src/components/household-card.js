import Card from "./card"
import Input from "./input"
import Select from "./select"

export default function HouseholdCard({ disabled, size, handleSizeChanged, 
    address, handleAddressChanged, type, handleTypeChanged, 
    owner, handleOwnerChanged }) {

    return (
        <Card 
            title="Household" 
            subtitle="Information about household size, residential status, etc            " 
            body={(
                <div className="flex flex-col space-y-2">
                    <Input 
                        name="size"
                        id="size"
                        label={'Size'}
                        value={size}
                        onChange={handleSizeChanged}
                        disabled={disabled}
                    />
                    <Input 
                        name="address"
                        id="address"
                        label={'Address'}
                        value={address}
                        onChange={handleAddressChanged}
                        disabled={disabled}
                    />
                    <Select 
                        name="type"
                        id="type"
                        label={'Type'}
                        options={['apartment', 'house', 'other']}
                        value={type}
                        onChange={handleTypeChanged}
                        disabled={disabled}
                    />
                    <Select 
                        name="owner"
                        id="owner"
                        label={'Owner'}
                        options={['no', 'yes']}
                        value={owner}
                        onChange={handleOwnerChanged}
                        disabled={disabled}
                    />
                </div>
            )} 
        />
    )
}