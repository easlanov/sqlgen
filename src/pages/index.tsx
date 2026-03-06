import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  createStaticDataProvider,
  Divider,
  GridLayout,
  Select,
  Text,
  Title,
  VSpacing,
} from '@hh.ru/magritte-ui';
import type { RootState } from '../store';
import { increment, decrement, setUsername } from '../store';
import { PageHeader } from '../components/PageHeader';

const OPTIONS_DEFAULT = [
  { value: '0', text: 'Эсперанто', langType: '2' },
  { value: '1', text: 'Английский', langType: '2' },
  { value: '2', text: 'Французский', langType: '3' },
  { value: '3', text: 'Русский', langType: '4' },
  { value: '4', text: 'Румынский', langType: '4' },
  { value: '5', text: 'Немецкий', langType: '2' },
  { value: '6', text: 'Тайский', langType: '2' },
  { value: '7', text: 'Китайский', langType: '3' },
  { value: '8', text: 'Арабский', langType: '4' },
  { value: '9', text: 'Молдавский', langType: '4', disabled: true },
  { value: '10', text: 'Ангольский', langType: '4' },
];

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.app.username);
  const counter = useSelector((state: RootState) => state.app.counter);

  const [value, setValue] = useState(OPTIONS_DEFAULT[0]);
  const staticProvider = useMemo(
    () => createStaticDataProvider(OPTIONS_DEFAULT, 'Популярные'),
    [],
  );

  return (
    <GridLayout>
      <VSpacing default={24} />

      <PageHeader
        title="Главная страница"
        description={
          <>
            Это главная страница примера. Перейдите на{' '}
            <Link to="/about">страницу «О проекте»</Link>.
          </>
        }
      />

      <VSpacing default={24} />

      <Card padding={16} borderRadius={16} shadow="level-1">
        <Title Element="h2" size="small">
          Пример работы со store
        </Title>

        <VSpacing default={12} />

        <Text>
          Имя пользователя в store: <b>{username}</b>
        </Text>
        <Text>
          Счётчик в store: <b>{counter}</b>
        </Text>

        <VSpacing default={16} />

        <Button
          mode="secondary"
          size="small"
          onClick={() => dispatch(setUsername('Иван'))}
        >
          Записать имя «Иван» в store
        </Button>

        <VSpacing default={8} />

        <Button
          mode="primary"
          size="small"
          onClick={() => dispatch(increment())}
        >
          Увеличить счётчик
        </Button>

        <VSpacing default={8} />

        <Button
          mode="secondary"
          size="small"
          onClick={() => dispatch(decrement())}
        >
          Уменьшить счётчик
        </Button>
      </Card>

      <VSpacing default={24} />

      <Card
        padding={16}
        paddingTop={12}
        paddingRight={24}
        paddingBottom={32}
        paddingLeft={40}
        borderRadius={16}
        borderTopLeftRadius={0}
        borderTopRightRadius={24}
        borderBottomRightRadius={32}
        borderBottomLeftRadius={40}
        borderWidth="default"
        shadow="level-1"
        increaseShadow
        pressEnabled
      >
        <div
          style={{
            width: 100,
            height: 100,
            border: '1px dashed red',
            backgroundColor: 'rgba(0,0,0,.2)',
          }}
        />
      </Card>

      <VSpacing default={32} />

      <Select
        type="checkbox"
        name="area"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        widthEqualToActivator={false}
        dataProvider={staticProvider}
      />

      <VSpacing default={32} />

      <Divider marginTop={16} marginBottom={16} />

      <Card stretched>
        <Title Element="h2" size="small">
          Magritte + React Router
        </Title>
        <VSpacing default={16} />
        <Text>
          Это простая статичная страница, собранная как отдельный пакет. Бандл включает HTML, JS и CSS,
          а UI собран на дизайн-системе Magritte.
        </Text>
        <VSpacing default={24} />
        <Button mode="primary" size="medium">
          Кнопка Magritte
        </Button>
      </Card>
    </GridLayout>
  );
};

