import React from 'react';
import { Container, Box, Grid, CssBaseline, Button, Card, styled, Paper, formHelperTextClasses } from '@mui/material';
import Axios from 'axios';
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
}));


function ImmigrationOfficerViewingPatient() {
    const location = useLocation(); //get data passed on through previous page (HealthOfficialPatientProfile page)
    const [patientData, setPatientData] = useState([]); //Patient data used in rendering of page

    let stopeffect = 1;

    useEffect(() => { //When page is loaded, get requests will get patient data as well as a list of patients whose profiles have been viewed
        Axios.get("http://localhost:8080/doctorViewingPatientData", { params: { id: location.state.ID } }).then((response) => {
            setPatientData(response.data);
        });
    }, [stopeffect]);



    let previousSymptoms = () => { //This function gets the list of all the patients previous symptom forms (to be rendered on a page in later sprint)
        Axios.get("http://localhost:8080/doctorViewingPreviousSymptoms", { params: { id: location.state.ID } }).then((response) => {
            console.log("success");
        });
    }

    let flagPatient = () => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/flagPatient", {
            PatientID: location.state.ID
        }).then(() => {
            console.log("success")
        });
    }

    let unflagPatient = () => { //When clicking the UNFLAG button, this will update the Flagged attribute in the patient tale to false
        Axios.post("http://localhost:8080/unflagPatient", {
            PatientID: location.state.ID //The patient ID is being passed to the post method
        }).then(()=>{
            console.log("success")
        });
    }

    let isFlagged = false; //variable to verify if patient has already been flagged, to be used for displaying either the FLAG or UNFLAG butttons
    let isFlaggedArray = patientData.map((val, key) => {return val.Flagged});
    if (isFlaggedArray[0] === 1){
        isFlagged = true;
    }

    return (

        <>

            {
                localStorage.getItem("role") != ('Immigration Officer') && <Navigate to={"/"} refresh={true} />
            }
            <div>
                <Container component='main'>
                    <CssBaseline />
                    <Box sx={{ padding: 5 }}>

                        <Card sx={{ maxWidth: 275, textAlign: 'center' }}><h1>Patient Profile </h1></Card>
                    </Box>
                    <Container>
                        {patientData.map((val, key) => {
                            return (
                                <Grid container spacing={2} key={key}>
                                    <Grid item xs={4}>
                                        <Item>Patient Name: {val.Fname + " " + val.Lname}</Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>Patient ID: {val.ID}</Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>Covid-19 Status: {val.Status}</Item>
                                    </Grid>
                                    <br></br>
                                    <Grid item xs={4}>
                                        <Item>Doctor: {val.DoctorFirst + " " + val.DoctorLast}</Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>Email: {val.Email}</Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>Phone Number: {val.Phone}</Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>Birthday: {val.Birthday.substring(0, 10)}</Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>Address: {val.Address}</Item>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Container>

                    <Box sx={{ padding: 5 }}>

                        {/* I'm thinking that we make a new page called PreviousSymptoms where all
                of the symptom forms will be sent.*/}
                        <Button sx={{ ml: 48 }} variant='outlined' onClick={previousSymptoms} href='/PreviousSymptoms'>
                            VIEW PREVIOUS SYMPTOM FORMS
                        </Button>
                        <br></br><br></br>
                        {isFlagged ? (<Button sx={{ml: 56}} variant='outlined' onClick={unflagPatient} href='/ImmigrationOfficerViewingPatient'>UNFLAG PATIENT</Button>) : 
                                     (<Button sx={{ml: 58}} variant='outlined' onClick={flagPatient} href='/ImmigrationOfficerViewingPatient'>FLAG PATIENT</Button>)}

                    </Box>
                </Container>

            </div>

        </>
    );

}


export default ImmigrationOfficerViewingPatient;