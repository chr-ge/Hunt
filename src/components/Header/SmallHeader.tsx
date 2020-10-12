import React from "react";
import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface SmallHeaderProps {
  title: string;
}

const SmallHeader = ({ title }: SmallHeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar color="primary" style={{ background: "#cc4d29" }}>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default SmallHeader;
