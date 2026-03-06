import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, GridLayout, Text, Title, VSpacing } from '@hh.ru/magritte-ui';

import modelsData from '../../json/models.json';

type ModelItem = {
  type: string;
  reasoning: string;
};

type ModelsJson = {
  models: ModelItem[];
};

const DATA = modelsData as ModelsJson;

export const ModelPage: React.FC = () => {
  const models = DATA.models ?? [];

  const modelTypes = useMemo(() => {
    const uniq = new Set<string>();
    models.forEach((m) => uniq.add(m.type));
    return Array.from(uniq);
  }, [models]);

  const reasoningByType = useMemo(() => {
    const map: Record<string, string[]> = {};
    models.forEach((m) => {
      if (!map[m.type]) {
        map[m.type] = [];
      }
      if (!map[m.type].includes(m.reasoning)) {
        map[m.type].push(m.reasoning);
      }
    });
    return map;
  }, [models]);

  const allReasoningLevels = useMemo(() => {
    const uniq = new Set<string>();
    models.forEach((m) => uniq.add(m.reasoning));
    return Array.from(uniq);
  }, [models]);

  const [selectedType, setSelectedType] = useState<string | null>(modelTypes[0] ?? null);

  const allowedReasoning = selectedType
    ? reasoningByType[selectedType] ?? []
    : [];

  const [selectedReasoning, setSelectedReasoning] = useState<string | null>(() => {
    if (!selectedType) {
      return allReasoningLevels[0] ?? null;
    }
    return (reasoningByType[selectedType]?.[0] ?? allReasoningLevels[0] ?? null);
  });

  const effectiveReasoningOptions = allowedReasoning.length ? allowedReasoning : allReasoningLevels;

  const isKnownCombination = useMemo(() => {
    if (!selectedType || !selectedReasoning) {
      return false;
    }
    return models.some((m) => m.type === selectedType && m.reasoning === selectedReasoning);
  }, [models, selectedReasoning, selectedType]);

  const handleSelectType = (nextType: string) => {
    setSelectedType(nextType);

    const nextAllowed = reasoningByType[nextType] ?? [];
    if (nextAllowed.length === 0) {
      return;
    }

    if (!selectedReasoning || !nextAllowed.includes(selectedReasoning)) {
      setSelectedReasoning(nextAllowed[0] ?? null);
    }
  };

  return (
    <GridLayout>
      <VSpacing default={24} />

      <Title Element="h1" size="medium">
        Выбор модели и уровня reasoning
      </Title>

      <VSpacing default={8} />

      <Text size="s" color="secondary">
        Выберите модель и уровень reasoning. Справа отображается итоговая конфигурация. Вернуться на
        главную можно по ссылке{' '}
        <Text as={Link as any} to="/" size="s">
          «Главная»
        </Text>
        .
      </Text>

      <VSpacing default={24} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Параметры
          </Title>

          <VSpacing default={12} />

          <Title Element="h3" size="small">
            Модель
          </Title>

          <VSpacing default={8} />

          {modelTypes.length === 0 && (
            <Text size="s" color="secondary">
              В `json/models.json` пока нет моделей.
            </Text>
          )}

          {modelTypes.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {modelTypes.map((t) => (
                <Button
                  key={t}
                  mode={t === selectedType ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleSelectType(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          )}

          <VSpacing default={24} />
          <Divider />
          <VSpacing default={16} />

          <Title Element="h3" size="small">
            Reasoning
          </Title>

          <VSpacing default={8} />

          {effectiveReasoningOptions.length === 0 && (
            <Text size="s" color="secondary">
              Нет доступных уровней reasoning.
            </Text>
          )}

          {effectiveReasoningOptions.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {effectiveReasoningOptions.map((r) => (
                <Button
                  key={r}
                  mode={r === selectedReasoning ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setSelectedReasoning(r)}
                  disabled={allowedReasoning.length > 0 && !allowedReasoning.includes(r)}
                >
                  {r}
                </Button>
              ))}
            </div>
          )}
        </Card>

        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Итог
          </Title>

          <VSpacing default={12} />

          {!selectedType && (
            <Text size="s" color="secondary">
              Выберите модель слева.
            </Text>
          )}

          {selectedType && (
            <>
              <Text>
                Модель: <b>{selectedType}</b>
              </Text>
              <Text>
                Reasoning: <b>{selectedReasoning ?? '—'}</b>
              </Text>

              <VSpacing default={12} />

              {!isKnownCombination && selectedReasoning && (
                <Text size="s" color="secondary">
                  Такой комбинации нет в `json/models.json`, но вы всё равно можете её выбрать.
                </Text>
              )}

              <VSpacing default={16} />
              <Divider />
              <VSpacing default={16} />

              <Text size="s" color="secondary">
                Конфигурация:
              </Text>
              <VSpacing default={8} />

              <pre
                style={{
                  margin: 0,
                  padding: 12,
                  borderRadius: 12,
                  background: 'rgba(0,0,0,0.04)',
                  overflowX: 'auto',
                }}
              >
                {JSON.stringify(
                  { type: selectedType, reasoning: selectedReasoning },
                  null,
                  2,
                )}
              </pre>
            </>
          )}
        </Card>
      </div>
    </GridLayout>
  );
};

