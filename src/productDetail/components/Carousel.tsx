import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles } from "@material-ui/core/styles";
import React, { ReactChildren, ReactNode } from 'react';
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;
const useStyles = makeStyles({
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      color: "rgb(255,225,0)",
    },
  });

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
interface Props{
   handleStepChange: any;
   activeStep: number;
   maxLength: number;
   children: ReactNode;
}
export default function Carousel({handleStepChange, activeStep, maxLength, children}: Props) {
    const classes = useStyles();
    return (
        <Container>
        <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            style={{width: '100%', border: "none"}}
            interval={3000}
          >
              {children}
        </AutoPlaySwipeableViews>
        <MobileStepper
        variant="dots"
        steps={maxLength}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={false}
        backButton={false}
        />
        </Container>
    )
};