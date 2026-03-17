import React from "react";
import { Box, Text } from "ink";
import { colors } from "../theme.js";

interface FooterProps {
  hint: string;
}

export function Footer({ hint }: FooterProps) {
  return (
    <Box marginTop={1}>
      <Text color={colors.overlay} dimColor>
        {hint}
      </Text>
    </Box>
  );
}
