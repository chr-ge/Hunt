import React from "react";
import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface LargeHeaderProps {
  title: string;
}

const LargeHeader = ({ title }: LargeHeaderProps) => {
  return (
    <IonHeader collapse="condense">
      <IonToolbar color="primary">
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default LargeHeader;
