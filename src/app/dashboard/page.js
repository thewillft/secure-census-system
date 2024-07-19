'use client'

import { useEffect, useState } from "react";
import Card from '../../components/card'
import DemographicCard from "../../components/demographic-card";
import HouseholdCard from "../../components/household-card";
 
export default function DashboardPage() {
    const [submissionPosted, setSubmissionPosted] = useState(false);
    const [submissionLoaded, setSubmissionLoaded] = useState(false);

    useEffect(() => {
        async function fetchSubmission() {
            try {
                const resp = await fetch('/api/submissions');
                const data = await resp.json();
                setSubmission(data);
                setSubmissionLoaded(true)
            } catch (e) {
                console.log(e);
            }
        }
        fetchSubmission();
    }, [submissionPosted])

    // -- DEMOGRAPHIC DATA -- 

    const [age, setAge] = useState(0)
    const [gender, setGender] = useState('female')
    const [ethnicity, setEthnicity] = useState('white')
    const [education, setEducation] = useState('none')
    const [employment, setEmployment] = useState('unemployed')

    const handleAgeChanged = (e) => setAge(e.target.value);
    const handleGenderChanged = (e) => setGender(e.target.value)
    const handleEthnicityChanged = (e) => setEthnicity(e.target.value)
    const handleEducationChanged = (e) => setEducation(e.target.value)
    const handleEmploymentChanged = (e) => setEmployment(e.target.value)

    // -- HOUSEHOLD DATA - 

    const [size, setSize] = useState(1)
    const [address, setAddress] = useState('')
    const [type, setType] = useState('apartment')
    const [owner, setOwner] = useState(false)

    const handleSizeChanged = (e) => setSize(e.target.value)
    const handleAddressChanged = (e) => setAddress(e.target.value)
    const handleTypeChanged = (e) => setType(e.target.value)
    const handleOwnerChanged = (e) => setOwner(e.target.value == 'yes')

    // -- OTHER --

    const getSubmission = () => ({
        demographic: {age, gender, ethnicity, education, employment},
        household: {size, address, type, owner}
    });
    const setSubmission = (submission) => {
        const demo = submission['demographic']
        setAge(demo['age'])
        setGender(demo['gender'])
        setEthnicity(demo['ethnicity'])
        setEducation(demo['education'])
        setEmployment(demo['employment'])
        const household = submission['household']
        setSize(household['size'])
        setAddress(household['address'])
        setType(household['type'])
        setOwner(household['owner'])
    }

    const handleSubmitClicked = () => fetch(
        '/api/submissions', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(getSubmission())
        }).then(resp => setSubmissionPosted(true)).catch(e => console.log(e));

    return (
        <main className="flex items-center justify-center py-3">
            <div className="w-1/3 space-y-1">
                {submissionLoaded && (<Card 
                    title={'Thank you for your response!'} 
                    subtitle={'We\'ve loaded your census submission below. Since only one submission is allowed per respondent, you will no longer be able to edit or submit any information, only review your submission.'} 
                />)}
                <DemographicCard 
                    disabled={submissionLoaded}
                    age={age} handleAgeChanged={handleAgeChanged}
                    gender={gender} handleGenderChanged={handleGenderChanged}
                    ethnicity={ethnicity} handleEthnicityChanged={handleEthnicityChanged}
                    education={education} handleEducationChanged={handleEducationChanged}
                    employment={employment} handleEmploymentChanged={handleEmploymentChanged}
                />
                <HouseholdCard 
                    disabled={submissionLoaded}
                    size={size} handleSizeChanged={handleSizeChanged}
                    address={address} handleAddressChanged={handleAddressChanged}
                    type={type} handleTypeChanged={handleTypeChanged}
                    owner={owner ? 'yes' : 'no'} handleOwnerChanged={handleOwnerChanged}
                />
                {!submissionLoaded && (<button className="w-full py-1 mt-1 rounded text-white bg-blue-400 text-center" onClick={handleSubmitClicked}>
                    Submit
                </button>)}
            </div>
        </main>
    );
}