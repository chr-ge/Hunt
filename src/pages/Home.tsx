import React from "react";
import { RouteComponentProps } from 'react-router';
import { IonContent, IonPage } from "@ionic/react";
import ProductList from "../components/Product/ProductList";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";

const Home = ({ location }: RouteComponentProps) => {
  return (
    <IonPage>
      <SmallHeader title="Hunt" />
      <IonContent color="medium" fullscreen>
        <LargeHeader title="Hunt" />
        <br></br>
        <ProductList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
