import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { colors } from "../theme.js";
import type { AirdropCheckResult } from "../types.js";
import { StepBar } from "../components/StepBar.js";
import { ResultsTable } from "../components/ResultsTable.js";
import { Footer } from "../components/Footer.js";

interface AnalysisScreenProps {
  results: AirdropCheckResult[];
  onNext: () => void;
}

export function AnalysisScreen({ results, onNext }: AnalysisScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for visual effect
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useInput((_input, key) => {
    if (key.return && !loading) onNext();
  });

  const eligible = results.filter(
    (r) => r.result.eligible && !r.result.alreadyClaimed
  );
  const claimed = results.filter((r) => r.result.alreadyClaimed);

  return (
    <Box flexDirection="column">
      <StepBar step={5} />

      {loading && (
        <Box gap={1}>
          <Text color={colors.mauve}>
            <Spinner type="dots" />
          </Text>
          <Text color={colors.text}>
            Analyzing airdrop eligibility...
          </Text>
        </Box>
      )}

      {!loading && (
        <Box flexDirection="column">
          <Box gap={2} marginBottom={1}>
            <Text color={colors.green} bold>
              {eligible.length} potentially eligible
            </Text>
            <Text color={colors.sky} bold>
              {claimed.length} already claimed
            </Text>
            <Text color={colors.overlay}>
              {results.length - eligible.length - claimed.length} not eligible
            </Text>
          </Box>
          <ResultsTable results={results} />
          <Footer hint="Press Enter for summary" />
        </Box>
      )}
    </Box>
  );
}
