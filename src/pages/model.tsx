import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, GridLayout, Text, Title, VSpacing } from '@hh.ru/magritte-ui';

import modelsData from '../../json/models.json';

type ModelItem = {
  type: string;
  reasoning: string[];
};

type ModelsJson = {
  models: ModelItem[];
};

const DATA = modelsData as ModelsJson;

export const ModelPage: React.FC = () => {
  const models = DATA.models ?? [];

  const modelTypes = useMemo(() => models.map((m) => m.type), [models]);

  const reasoningByType = useMemo(() => {
    const map: Record<string, string[]> = {};
    models.forEach((m) => {
      map[m.type] = Array.from(new Set(m.reasoning ?? []));
    });
    return map;
  }, [models]);

  const [selectedType, setSelectedType] = useState<string | null>(modelTypes[0] ?? null);

  const allowedReasoning = useMemo(() => {
    if (!selectedType) {
      return [];
    }
    return reasoningByType[selectedType] ?? [];
  }, [reasoningByType, selectedType]);

  const [selectedReasoning, setSelectedReasoning] = useState<string | null>(() => {
    const firstType = modelTypes[0];
    if (!firstType) {
      return null;
    }
    const firstReasoning = models[0]?.reasoning?.[0];
    return firstReasoning ?? null;
  });

  useEffect(() => {
    if (!selectedType) {
      if (modelTypes.length) {
        setSelectedType(modelTypes[0] ?? null);
      }
      return;
    }

    const options = reasoningByType[selectedType] ?? [];
    if (options.length === 0) {
      setSelectedReasoning(null);
      return;
    }

    if (!selectedReasoning || !options.includes(selectedReasoning)) {
      setSelectedReasoning(options[0] ?? null);
    }
  }, [modelTypes, reasoningByType, selectedReasoning, selectedType]);

  const handleSelectType = (nextType: string) => {
    setSelectedType(nextType);
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

          {allowedReasoning.length === 0 && (
            <Text size="s" color="secondary">
              Нет доступных уровней reasoning.
            </Text>
          )}

          {allowedReasoning.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {allowedReasoning.map((r) => (
                <Button
                  key={r}
                  mode={r === selectedReasoning ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setSelectedReasoning(r)}
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

