import { Button, Card, Tab, Tabs, Title, VSpacing } from "@hh.ru/magritte-ui";
import { useDispatch } from "react-redux";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import useFetchModelOptions, {
  DEFAULT_REASONINGS,
} from "./hooks/useFetchModelOptions";

const Model = () => {
  const dispatch = useDispatch();
  const { models, defaultModel, defaultReasoning } = useFetchModelOptions();
  const [currentModel, setCurrentModel] = useState(defaultModel);
  const [currentReasoning, setCurrentReasoning] = useState(defaultReasoning);

  const currentModelAllPossibleReasoning = useMemo(() => {
    const { reasoning } = models.find(({ type }) => type === currentModel) || {
      reasoning: DEFAULT_REASONINGS,
    };
    return reasoning;
  }, [models, currentModel]);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Модель
          </Title>
          <VSpacing default={8} />
          <Tabs activeItemId={currentModel} onChange={setCurrentModel}>
            {models.map(({ type }) => (
              <Tab key={type} id={type}>
                {type}
              </Tab>
            ))}
          </Tabs>
        </Card>
        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Глубина рассуждений
          </Title>
          <VSpacing default={8} />
          <Tabs activeItemId={currentReasoning} onChange={setCurrentReasoning}>
            {currentModelAllPossibleReasoning.map((reasoning) => (
              <Tab key={reasoning} id={reasoning}>
                {reasoning}
              </Tab>
            ))}
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default Model;
