import { GridLayout, Title, VSpacing } from "@hh.ru/magritte-ui";
import { FC, PropsWithChildren, ReactNode } from "react";

interface LayoutProps {
  title: ReactNode;
  description: ReactNode;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title,
  description,
  children,
}) => (
  <GridLayout>
    <VSpacing default={24} />
    <Title Element="h1" size="medium" description={description}>
      {title}
    </Title>
    <VSpacing default={24} />
    {children}
  </GridLayout>
);

export default Layout;
