import * as React from 'react';
import {
  Box,
  Step,
  Button,
  Stepper,
  StepLabel,
  Typography,
} from '@mui/material';

import { StepOne } from './stepOne.component';
import { StepTwo } from './stepTwo.component';
import { StepThree } from './stepThree.component';
import { StepFour } from './stepFour.component';
import { StepFive } from './stepFive.component';

const steps = [
  'Selecione a sequência de movimentos',
  'Mapeie as entradas/saídas do sistema',
  'Teste das entradas/saídas',
  'Esquema Pneumatico',
  'Execute a sequência',
];

export const Steps: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [sequence, setSequence] = React.useState<string[]>([]);

  const handleCallbackSequence = React.useCallback((seq: string[]) => {
    setSequence(seq);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', padding: 10 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step
              key={label}
              {...stepProps}
              onClick={() => {
                setActiveStep(index);
              }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Sequência executada.</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reiniciar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <StepOne handleCallbackSequence={handleCallbackSequence} />
          )}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
          {activeStep === 3 && <StepFour />}
          {activeStep === 4 && <StepFive sequence={sequence} />}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retroceder
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Concluir' : 'Avançar'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
