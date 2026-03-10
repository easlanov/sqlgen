import React, { useState } from "react";
import { Button } from "@hh.ru/magritte-ui";
import Layout from "../components/layout/Index";
import Steps from "../components/steps/Index";
import Model from "../components/model/Index";
import Context from "../components/context/Index";

export const HomePage: React.FC = () => {
  const [progress, setProgress] = useState(1);

  const renderPrimaryActions = () => {
    if (progress === 1) {
      return (
        <Button mode="primary" style="accent" onClick={() => setProgress(2)}>
          Выбрать контекст
        </Button>
      );
    }

    if (progress === 2) {
      return (
        <Button mode="primary" style="accent" onClick={() => setProgress(3)}>
          Сгенерировать запрос
        </Button>
      );
    }

    if (progress === 3) {
      return (
        <Button mode="primary" style="accent" onClick={() => setProgress(4)}>
          Сделать запрос в базу
        </Button>
      );
    }

  };

  const renderSecondaryActions = () => {
    const previousStep = progress - 1;
    if (previousStep <= 0) {
      return null;
    }
    return (
      <Button mode="tertiary" style="accent" onClick={() => setProgress(previousStep)}>
        Назад
      </Button>
    );
  };

  const renderTitle = () => {
    if (progress === 1) {
      return "Параметры модели";
    }

    if (progress === 2) {
      return "Контекст";
    }

    if (progress === 3) {
      return "Генерация запроса";
    }

    if (progress === 4) {
      return "Запрос в базу данных";
    }

    return null;
  };

  const renderDescription = () => {
    if (progress === 1) {
      return "Выберите модель и глубину рассуждений";
    }

    if (progress === 2) {
      return "Сначала выберите домен, затем отметьте нужные контексты (таблицы) в этом домене. Справа отображается итоговый список выбранных контекстов, сгруппированных по доменам.";
    }

    return null;
  };

  return (
    <Layout title={renderTitle()} description={renderDescription()}>
      {progress === 1 && <Model />}
      {progress === 2 && <Context />}
      <Steps
        progress={progress}
        secondaryActions={renderSecondaryActions()}
        primaryActions={renderPrimaryActions()}
      />
    </Layout>
  );
};
