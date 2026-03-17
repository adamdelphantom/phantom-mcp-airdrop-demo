import React from "react";
import { Box, useInput } from "ink";
import { Banner } from "../components/Banner.js";
import { StepBar } from "../components/StepBar.js";
import { Footer } from "../components/Footer.js";

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  useInput((_input, key) => {
    if (key.return) onNext();
  });

  return (
    <Box flexDirection="column">
      <StepBar step={1} />
      <Banner />
      <Footer hint="Press Enter to connect wallet" />
    </Box>
  );
}
