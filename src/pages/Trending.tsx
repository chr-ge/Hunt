import React from "react";
import { RouteComponentProps } from 'react-router';
import { IonContent, IonPage } from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
import ProductList from "../components/Product/ProductList";

const Trending = ({ location }: RouteComponentProps) => {
  return (
    <IonPage>
      <SmallHeader title="Trending" />
      <IonContent color="medium" fullscreen>
        <LargeHeader title="Hunt" />
        <br></br>
        <ProductList />
      </IonContent>
    </IonPage>
  );
};

export default Trending;
