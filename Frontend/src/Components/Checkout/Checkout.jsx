import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLocation } from 'react-router-dom';
import Delivery_Address from './Delivery_Address';
import Order_Summery from './Order_Summery';

const steps = ['Login', 'Delivery Address', 'Order Summery', 'Payment'];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const location = useLocation()

  const querySearch = new URLSearchParams(location.search)

  const step = querySearch.get('step')


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };





  return (

    <div className="stepper-section px-5 py-5">
      <div className='stepper'>
        <Stepper activeStep={step} >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps} >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      {activeStep === steps.length ? (
        <div className="no-product">
          <p>
            All steps completed -  finished
          </p>
        </div>
      ) : (
        <>
          <button className='back-button' disabled={activeStep === 0} onClick={handleBack}  > Back </button>
          {(step == 2 ? <Delivery_Address /> : <Order_Summery />)}
        </>
      )}
    </div>
  );
}

export default Checkout