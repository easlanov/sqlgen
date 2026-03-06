import React, { useState } from 'react';
import { GridLayout, Card, Button, Text, Title, VSpacing } from '@hh.ru/magritte-ui';
import { TextArea } from '@hh.ru/magritte-ui-textarea/TextArea';
import { Input } from '@hh.ru/magritte-ui-input/Input';

export const AskDbPage: React.FC = () => {
  const [modelType, setModelType] = useState('');
  const [context, setContext] = useState('');
  const [nlQuery, setNlQuery] = useState('');
  const [planText, setPlanText] = useState('');
  const [sqlText, setSqlText] = useState('');
  const [resultText, setResultText] = useState('');
  const [reportText, setReportText] = useState('');

  return (
    <GridLayout>
      <VSpacing default={24} />

      <Title Element="h1" size="medium">
        Страничка генератора askdb.pyn.ru
      </Title>

      <VSpacing default={24} />

      {/* Параметры модели + выбор контекста / окно ввода запроса */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Параметры модели
          </Title>

          <VSpacing default={12} />

          <Text size="s" color="secondary">
            Тип моделирования рассуждений. Задает уточняющие вопросы.
          </Text>

          <VSpacing default={16} />

          <Input
            name="modelType"
            label="Тип модели"
            placeholder="Например: обычный / с цепочкой рассуждений"
            value={modelType}
            onChange={(event) => setModelType(event.target.value)}
          />

          <VSpacing default={24} />

          <Title Element="h3" size="small">
            Выбор контекста
          </Title>

          <VSpacing default={8} />

          <Text size="s" color="secondary">
            Источник контекста — ручка <code>get_context_tree_route</code>.
            <br />
            <br />
            <b>args</b>:
            <br />
            <code>req: dict</code> — сейчас не используется (может быть пустым объектом запроса).
            <br />
            <br />
            <b>return / output: dict</b>:
            <br />
            <code>context_tree: dict[str, list[str]]</code> — домен → список таблиц в формате
            <code> "db.table"</code>.
            <br />
            <code>context_tree_default_check: dict[str, list[str]]</code> — домен → список
            <code> "db.table"</code>, отмеченных по умолчанию на UI.
            <br />
            <code>context_name_mapping: dict[str, str]</code> — <code>"db.table"</code> → человекочитаемое
            название таблицы.
            <br />
            <code>domain_name_mapping: dict[str, str]</code> — <code>domain</code> → человекочитаемое
            название домена.
          </Text>

          <VSpacing default={12} />

          <TextArea
            name="context"
            placeholder="Здесь в дальнейшем будет отображаться выбранный пользователем контекст (домены и таблицы)."
            value={context}
            onChange={(event) => setContext(event.target.value)}
            minRows={3}
          />
        </Card>

        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Окно ввода запроса
          </Title>

          <VSpacing default={12} />

          <Text size="s" color="secondary">
            Формулировка на естественном языке, которую нужно перевести в SQL.
          </Text>

          <VSpacing default={12} />

          <TextArea
            name="nlQuery"
            placeholder="Пример: выведи кол-во новых работодателей в 2025 году"
            value={nlQuery}
            onChange={(event) => setNlQuery(event.target.value)}
            minRows={6}
          />
        </Card>
      </div>

      <VSpacing default={24} />

      <Button mode="primary" size="medium">
        Сгенерировать запрос
      </Button>

      <VSpacing default={24} />

      {/* План / SQL */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          alignItems: 'stretch',
        }}
      >
        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h3" size="small">
            План запроса / уточняющие вопросы / варнинги
          </Title>

          <VSpacing default={12} />

          <TextArea
            name="plan"
            placeholder="Здесь будет план запроса, уточняющие вопросы к пользователю и предупреждения."
            value={planText}
            onChange={(event) => setPlanText(event.target.value)}
            minRows={6}
          />
        </Card>

        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h3" size="small">
            SQL code
          </Title>

          <VSpacing default={12} />

          <TextArea
            name="sql"
            placeholder="Сгенерированный SQL‑запрос к Trino."
            value={sqlText}
            onChange={(event) => setSqlText(event.target.value)}
            minRows={6}
            spellCheck={false}
          />
        </Card>
      </div>

      <VSpacing default={24} />

      <Button mode="primary" size="medium">
        Сделать запрос в базу
      </Button>

      <VSpacing default={24} />

      {/* Результат запроса */}
      <Card padding={24} borderRadius={16} shadow="level-1" stretched>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <Title Element="h3" size="small">
              Окно выгрузки данных из базы
            </Title>

            <VSpacing default={8} />

            <Text size="s" color="secondary">
              1) Первые 10 строк результата запроса, если всё ок.
              <br />
              2) Возвращаемая ошибка, если есть проблемы с запросом.
            </Text>

            <VSpacing default={12} />

            <TextArea
              name="result"
              placeholder="Пример данных или сообщение об ошибке..."
              value={resultText}
              onChange={(event) => setResultText(event.target.value)}
              minRows={6}
              spellCheck={false}
            />
          </div>

          <Button mode="destructive" size="small">
            Прервать запрос
          </Button>
        </div>
      </Card>

      <VSpacing default={24} />

      <Button mode="primary" size="medium">
        Скачать Excel выгрузку
      </Button>

      <VSpacing default={24} />

      {/* Текст репорта */}
      <Card padding={24} borderRadius={16} shadow="level-1">
        <Title Element="h3" size="small">
          Текст репорта
        </Title>

        <VSpacing default={12} />

        <Text size="s" color="secondary">
          Сообщение на случай, если пользователь видит бизнес‑ошибки работы модели или запрашивает
          дополнительные таблицы в контекст и т.д.
        </Text>

        <VSpacing default={12} />

        <TextArea
          name="report"
          placeholder="Опишите замечания к отчёту, недостающие данные или бизнес‑ошибки..."
          value={reportText}
          onChange={(event) => setReportText(event.target.value)}
          minRows={4}
        />
      </Card>

      <VSpacing default={24} />

      <Button mode="primary" size="medium">
        Отправить репорт
      </Button>

      <VSpacing default={40} />
    </GridLayout>
  );
};

