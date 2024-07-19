import Card from "./card"
import Input from "./input"
import Select from "./select"

export default function DemographicCard({ disabled, age, handleAgeChanged, 
    gender, handleGenderChanged, ethnicity, handleEthnicityChanged, 
    education, handleEducationChanged, employment, handleEmploymentChanged }) {

    return (
        <Card 
            title="Demographic" 
            subtitle="Information about race, gender, etc" 
            body={(
                <div className="flex flex-col space-y-2">
                    <Input 
                        name="age"
                        id="age"
                        label={'Age'}
                        value={age}
                        onChange={handleAgeChanged}
                        disabled={disabled}
                    />
                    <Select 
                        name="gender"
                        id="gender"
                        label={'Gender'}
                        options={['male', 'female', 'other']}
                        value={gender}
                        onChange={handleGenderChanged}
                        disabled={disabled}
                    />
                    <Select 
                        name="ethnicity"
                        id="ethnicity"
                        label={'Ethnicity'}
                        options={['white', 'black', 'hispanic', 'asian', 'other']}
                        value={ethnicity}
                        onChange={handleEthnicityChanged}
                        disabled={disabled}
                    />
                    <Select 
                        name="education"
                        id="education"
                        label={'Education'}
                        options={['none', 'high school', 'bachelors', 'masters', 'phd']}
                        value={education}
                        onChange={handleEducationChanged}
                        disabled={disabled}
                    />
                    <Select 
                        name="employment"
                        id="employment"
                        label={'Employment'}
                        options={['unemployed', 'student', 'employed']}
                        value={employment}
                        onChange={handleEmploymentChanged}
                        disabled={disabled}
                    />
                </div>
            )} 
        />
    )
}