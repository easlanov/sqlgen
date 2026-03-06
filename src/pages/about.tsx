import React from 'react';
import { Link } from 'react-router-dom';
import { Button, GridLayout, Text, Title, VSpacing } from '@hh.ru/magritte-ui';

export const AboutPage: React.FC = () => {
  return (
    <GridLayout>
      <VSpacing default={24} />

      <Title Element="h1" size="medium">
        О проекте
      </Title>

      <VSpacing default={16} />

      <Text>
        Это пример второй страницы по адресу <code>/about</code>, подключённой через react-router-dom.
      </Text>

      <VSpacing default={24} />

      <Button as={Link as any} to="/" mode="secondary" size="medium">
        Назад на главную
      </Button>
    </GridLayout>
  );
};

