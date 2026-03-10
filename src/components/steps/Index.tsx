import { ActionBar, Button, ProgressBar } from "@hh.ru/magritte-ui";
import { FC, ReactNode } from "react";

interface StepsProps {
  progress: number;
  primaryActions: ReactNode;
  secondaryActions?: ReactNode;
}

const Steps: FC<StepsProps> = ({
  progress,
  primaryActions,
  secondaryActions,
}) => (
  <ActionBar
    isFixed
    type="horizontal"
    padding={16}
    showProgress={<ProgressBar progress={progress} segments={4} />}
    primaryActions={primaryActions}
    secondaryActions={secondaryActions}
  />
);

export default Steps;
