import { Avatar, IconButton, Button, Box, Grid, CardHeader,} from '@mui/material';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Navigate} from "react-router-dom";


function DoctorDashboard() {

  const [patientList, setPatientList] = useState([]); //all patient info
  const [patientsPerDoctor, setPatientPerDoctorList] = useState([]); //all patient info
  const [allPatients, setAllPatientList] = useState([]); //all patient info
  
  var tempDoctorID = 6;

  function getDoctorPatients() { //returns all patient information for a given doctor using GET
    Axios.get("http://localhost:8080/doctorViewingTheirPatientData", {params: {id: tempDoctorID}}).then((response) => {
      setPatientList(response.data);
      console.log("Logged In Doctor Patients:");
      console.log(response.data);
    });
  };

  
  function getPatientsPerDoctor(){ //returns all patient information organized by doctor using GET
    Axios.get("http://localhost:8080/doctorViewingDoctorPatients").then((response) => {
      setPatientPerDoctorList(response.data);
      console.log("Patients Organized By Doctor:");
      console.log(response.data);
    });
  };

  
  function getAllPatients(){ //returns all patient information using GET
    Axios.get("http://localhost:8080/doctorViewingAllPatientData").then((response) => {
      setAllPatientList(response.data);
      console.log("All Patients:");
      console.log(response.data);
    });  
  };

  let stopeffect = 1;

  
  useEffect(() => { //when the doctor dashboard page is rendered, these functions are executed
  getDoctorPatients();
  getPatientsPerDoctor();
  getAllPatients();
  },[stopeffect]);

  return (

      <>
        {
          localStorage.getItem("role")!='Doctor' && <Navigate to={"/"} refresh={true}/>
        }
    <div>
      <Box sx={{ padding: 5 }}>
        <h1>Doctor Dashboard
          <Button variant="outlined" href="#outlined-buttons" sx={{ textAlign: 'right', position: 'absolute', right: '10%' }}>
            Filter
          </Button>
        </h1>
      </Box>
      <Box sx={{ flexGrow: 1 }} textAlign='center'>
        <Grid container spacing={5} columns={12}>
          {Array.from(Array(12)).map((_, index) => ( //array value is the number of patients
            <Grid item md={4} key={index}>
              <button>
                <CardHeader
                  avatar={
                    <Avatar aria-label="">
                      P{index}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label=""></IconButton>
                  }
                  title="Patient Profile"
                  subheader="Name of Patient"
                />
              </button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ padding: 10 }}>
        <Button variant="outlined" href="#outlined-buttons" sx={{ textAlign: 'right', position: 'absolute', right: '9%' }}>
          Review Medical Checklist
        </Button>
      </Box>
    </div> </>
  );
}
export default DoctorDashboard;