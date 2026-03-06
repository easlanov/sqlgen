import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, Title, VSpacing } from '@hh.ru/magritte-ui';

export type PageHeaderProps = {
  /** Заголовок страницы */
  title: string;
  /** Описание под заголовком */
  description?: ReactNode;
  /** Путь, по которому будет вести кнопка/ссылка */
  actionHref?: string;
  /** Текст кнопки/ссылки */
  actionLabel?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actionHref,
  actionLabel,
}) => {
  return (
    <>
      <Title Element="h1" size="medium">
        {title}
      </Title>

      {description && (
        <>
          <VSpacing default={8} />
          <Text>{description}</Text>
        </>
      )}

      {actionHref && actionLabel && (
        <>
          <VSpacing default={16} />
          <Button as={Link as any} to={actionHref} mode="secondary" size="small">
            {actionLabel}
          </Button>
        </>
      )}
    </>
  );
};

