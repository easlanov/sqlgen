import {
  Button,
  Card,
  Divider,
  Title,
  VSpacing,
  Text,
  Cell,
  Checkbox,
  CellText,
} from "@hh.ru/magritte-ui";
import { useMemo, useState } from "react";
import { DATA } from "./data";
import { ContextTreeDefaultCheck } from "./types";

type SelectedContextState = Record<string, Set<string>>;

const createInitialSelected = (
  defaults: ContextTreeDefaultCheck,
): SelectedContextState => {
  const result: SelectedContextState = {};

  Object.entries(defaults).forEach(([domain, contexts]) => {
    result[domain] = new Set(contexts);
  });

  return result;
};

const Context = () => {
  const {
    context_tree,
    context_tree_default_check,
    context_name_mapping,
    domain_name_mapping,
  } = DATA;
  const domains = useMemo(
    () =>
      Object.entries(domain_name_mapping).map(([domain, title]) => ({
        id: domain,
        title,
      })),
    [domain_name_mapping],
  );

  const [selectedDomain, setSelectedDomain] = useState<string | null>(
    domains.length ? domains[0].id : null,
  );

  const [selectedByDomain, setSelectedByDomain] =
    useState<SelectedContextState>(() =>
      createInitialSelected(context_tree_default_check),
    );

  const currentDomainContexts = selectedDomain
    ? (context_tree[selectedDomain] ?? [])
    : [];

  const handleSelectAllInDomain = (domain: string) => {
    const contexts = context_tree[domain] ?? [];

    setSelectedByDomain((prev) => ({
      ...prev,
      [domain]: new Set(contexts),
    }));
  };

  const handleClearDomain = (domain: string) => {
    setSelectedByDomain((prev) => {
      if (!prev[domain]) {
        return prev;
      }

      const next = { ...prev };
      next[domain] = new Set();
      return next;
    });
  };

  const handleToggleContext = (domain: string, context: string) => {
    setSelectedByDomain((prev) => {
      const existingForDomain = prev[domain] ?? new Set<string>();
      const nextForDomain = new Set(existingForDomain);

      if (nextForDomain.has(context)) {
        nextForDomain.delete(context);
      } else {
        nextForDomain.add(context);
      }

      return {
        ...prev,
        [domain]: nextForDomain,
      };
    });
  };

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Выбор домена
          </Title>

          <VSpacing default={12} />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {domains.map((domain) => (
              <Button
                key={domain.id}
                mode={domain.id === selectedDomain ? "primary" : "secondary"}
                size="small"
                onClick={() => setSelectedDomain(domain.id)}
              >
                {domain.title}
              </Button>
            ))}
          </div>

          <VSpacing default={24} />
          <Divider />
          <VSpacing default={16} />

          <Title Element="h3" size="small">
            Контексты выбранного домена
          </Title>

          <VSpacing default={8} />

          {!selectedDomain && (
            <Text color="secondary">Для начала выберите домен.</Text>
          )}

          {selectedDomain && currentDomainContexts.length === 0 && (
            <Text color="secondary">Для домена пока нет контекстов.</Text>
          )}

          {selectedDomain && currentDomainContexts.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                  gap: 8,
                }}
              >
                <Text color="secondary">
                  Отметьте нужные таблицы в домене «
                  {domain_name_mapping[selectedDomain]}».
                </Text>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  <Button
                    mode="ghost"
                    size="xs"
                    onClick={() => handleSelectAllInDomain(selectedDomain)}
                  >
                    Выбрать все
                  </Button>
                  <Button
                    mode="ghost"
                    size="xs"
                    onClick={() => handleClearDomain(selectedDomain)}
                  >
                    Снять все
                  </Button>
                </div>
              </div>

              <VSpacing default={8} />

              <div
                style={{
                  display: "grid",
                  gap: 4,
                }}
              >
                {currentDomainContexts.map((contextKey) => {
                  const isChecked =
                    selectedByDomain[selectedDomain]?.has(contextKey) ?? false;
                  const displayName =
                    context_name_mapping[contextKey] ?? contextKey;

                  return (
                    <Cell
                      left={
                        <Checkbox
                          key={contextKey}
                          name={contextKey}
                          checked={isChecked}
                          onChange={() =>
                            handleToggleContext(selectedDomain, contextKey)
                          }
                        />
                      }
                    >
                      <CellText>{displayName}</CellText>
                    </Cell>
                  );
                })}
              </div>
            </>
          )}
        </Card>

        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Выбранный контекст
          </Title>

          <VSpacing default={8} />

          {Object.entries(domain_name_mapping).every(
            ([domain]) =>
              !selectedByDomain[domain] || selectedByDomain[domain].size === 0,
          ) && (
            <Text size="s" color="secondary">
              Пока ничего не выбрано.
            </Text>
          )}

          {Object.entries(domain_name_mapping).map(([domain, domainTitle]) => {
            const selected = selectedByDomain[domain];
            if (!selected || selected.size === 0) {
              return null;
            }

            const contexts = Array.from(selected);

            return (
              <div key={domain} style={{ marginBottom: 16 }}>
                <Text weight="bold">{domainTitle}</Text>
                <VSpacing default={4} />
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {contexts.map((contextKey) => {
                    const displayName =
                      context_name_mapping[contextKey] ?? contextKey;
                    return <li key={contextKey}>{displayName}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </Card>
      </div>
    </>
  );
};

export default Context;
