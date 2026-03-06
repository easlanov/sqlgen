import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, GridLayout, Text, Title, VSpacing } from '@hh.ru/magritte-ui';
import { TextArea } from '@hh.ru/magritte-ui-textarea/TextArea';

type BackendAnswer = {
  model_answer_id?: string;
  model_answer_type?: 'sql' | 'msg' | string;
  model_answer?: string;
  model_answer_status?: 'ok' | 'error' | string;
  plan?: string | string[];
  query_plan?: string | string[];
  reasoning?: string | string[];
  sql?: string;
  generated_sql?: string;
  questions?: string | string[];
};

const toText = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join('\n');
  }
  if (typeof value === 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

const extractSqlFromAnswer = (answer: string): string => {
  const trimmed = (answer ?? '').trim();
  if (!trimmed) {
    return '';
  }

  const marker = '--- SQL ---';
  const idx = trimmed.indexOf(marker);
  if (idx >= 0) {
    return trimmed.slice(idx + marker.length).trim();
  }

  const fenced = trimmed.match(/```sql\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  if (/^\s*(select|with|insert|update|delete)\b/i.test(trimmed)) {
    return trimmed;
  }

  return '';
};

export const RequestPage: React.FC = () => {
  const [nlQuery, setNlQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  const [planText, setPlanText] = useState('');
  const [sqlText, setSqlText] = useState('');
  const [questionsText, setQuestionsText] = useState('');
  const [rawResponseText, setRawResponseText] = useState('');

  const canSend = useMemo(() => nlQuery.trim().length > 0 && !isLoading, [isLoading, nlQuery]);

  const handleSend = async () => {
    if (!canSend) {
      return;
    }

    setIsLoading(true);
    setErrorText('');
    setPlanText('');
    setSqlText('');
    setQuestionsText('');
    setRawResponseText('');

    try {
      const baseUrl = (import.meta as any).env?.VITE_BACKEND_URL as string | undefined;
      const url = `${(baseUrl ?? '').replace(/\/$/, '')}/request`;

      const { data } = await axios.post<BackendAnswer>(
        url,
        { query: nlQuery.trim() },
        { headers: { 'Content-Type': 'application/json' } },
      );

      setRawResponseText(JSON.stringify(data, null, 2));

      const plan =
        toText(data.plan) ||
        toText(data.query_plan) ||
        toText(data.reasoning);
      setPlanText(plan);

      const questions = toText(data.questions);
      const answerText = toText(data.model_answer);
      const sql =
        (data.sql ?? '').trim() ||
        (data.generated_sql ?? '').trim() ||
        extractSqlFromAnswer(answerText);

      if (data.model_answer_type === 'msg' || (!sql && answerText && !plan)) {
        setQuestionsText(questions || answerText);
        return;
      }

      if (!sql && (questions || answerText)) {
        setQuestionsText(questions || answerText);
      }

      setSqlText(sql);
    } catch (e: any) {
      const message =
        e?.response?.data?.message ||
        e?.message ||
        'Не удалось отправить запрос в backend.';
      setErrorText(String(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GridLayout>
      <VSpacing default={24} />

      <Title Element="h1" size="medium">
        Request → SQL
      </Title>

      <VSpacing default={8} />

      <Text size="s" color="secondary">
        Введите запрос на естественном языке и отправьте его в backend. В ответ ожидаем либо план + SQL,
        либо уточняющие вопросы. Вернуться на главную можно по ссылке{' '}
        <Text as={Link as any} to="/" size="s">
          «Главная»
        </Text>
        .
      </Text>

      <VSpacing default={24} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Запрос
          </Title>

          <VSpacing default={12} />

          <Text size="s" color="secondary">
            Поддерживается отправка по кнопке или по <b>Ctrl/⌘ + Enter</b>.
          </Text>

          <VSpacing default={12} />

          <TextArea
            name="nlQuery"
            placeholder="Например: покажи число заказов по дням за последние 7 дней"
            value={nlQuery}
            onChange={(event) => setNlQuery(event.target.value)}
            minRows={6}
            onKeyDown={(event: any) => {
              const isEnter = event.key === 'Enter';
              const isMod = event.ctrlKey || event.metaKey;
              if (isEnter && isMod) {
                event.preventDefault();
                void handleSend();
              }
            }}
          />

          <VSpacing default={16} />

          <Button mode="primary" size="medium" disabled={!canSend} onClick={() => void handleSend()}>
            {isLoading ? 'Генерирую…' : 'Отправить в backend'}
          </Button>

          {errorText && (
            <>
              <VSpacing default={12} />
              <Text size="s" color="negative">
                {errorText}
              </Text>
            </>
          )}

          <VSpacing default={16} />
          <Divider />
          <VSpacing default={12} />

          <Text size="s" color="secondary">
            URL ручки: <code>POST /request</code>. Можно задать базу через{' '}
            <code>VITE_BACKEND_URL</code> (например, <code>http://localhost:8000</code>).
          </Text>
        </Card>

        <Card padding={24} borderRadius={16} shadow="level-1">
          <Title Element="h2" size="small">
            Ответ
          </Title>

          <VSpacing default={12} />

          <Title Element="h3" size="small">
            План
          </Title>

          <VSpacing default={8} />

          <TextArea
            name="plan"
            placeholder="План запроса (или reasoning) появится здесь."
            value={planText}
            onChange={(event) => setPlanText(event.target.value)}
            minRows={5}
            spellCheck={false}
          />

          <VSpacing default={16} />

          <Title Element="h3" size="small">
            SQL
          </Title>

          <VSpacing default={8} />

          <TextArea
            name="sql"
            placeholder="Сгенерированный SQL появится здесь."
            value={sqlText}
            onChange={(event) => setSqlText(event.target.value)}
            minRows={6}
            spellCheck={false}
          />

          <VSpacing default={16} />

          <Title Element="h3" size="small">
            Уточняющие вопросы
          </Title>

          <VSpacing default={8} />

          <TextArea
            name="questions"
            placeholder="Если backend вернёт уточняющие вопросы, они появятся здесь."
            value={questionsText}
            onChange={(event) => setQuestionsText(event.target.value)}
            minRows={4}
            spellCheck={false}
          />

          <VSpacing default={16} />
          <Divider />
          <VSpacing default={12} />

          <Title Element="h3" size="small">
            Raw JSON (для дебага)
          </Title>

          <VSpacing default={8} />

          <TextArea
            name="raw"
            placeholder="Полный ответ backend (JSON) появится здесь."
            value={rawResponseText}
            onChange={(event) => setRawResponseText(event.target.value)}
            minRows={6}
            spellCheck={false}
          />
        </Card>
      </div>

      <VSpacing default={40} />
    </GridLayout>
  );
};

