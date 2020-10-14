import React, { useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
} from "@ionic/react";
import useFormValidation, { ProductInterface } from "../hooks/useFormValidation";
import validateCreateProduct, { ProductErrors } from "../components/Product/validateCreateProduct";
import firebase from "../firebase";
import UserContext from "../context/UserContext";
import { toast } from "../utils/toast";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";

const INITIAL_STATE = {
  title: "",
  description: "",
  url: "",
};

const Submit = ({ history }: RouteComponentProps) => {
  const { user } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, handleChange, values } = useFormValidation<ProductInterface, ProductErrors>(
    INITIAL_STATE,
    validateCreateProduct,
    handleCreate
  );

  async function handleCreate() {
    try {
      if (!user) {
        history.push("/login");
        return;
      }
      setSubmitting(true);
      const { title, description, url } = values;
      const id = firebase.db.collection("products").doc().id;

      const newProduct = {
        title,
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        voteCount: 1,
        comments: [],
        votes: [
          {
            votedBy: { id: user.uid, name: user.displayName },
          },
        ],
        timestamp: Date.now(),
      };

      await firebase.db.collection("products").doc(id).set(newProduct);
      toast("Product created successfully.");
      history.push("/");
    } catch (err) {
      console.log("Submit Error", err);
      toast(err.message);
    }
  }

  return (
    <IonPage>
      <SmallHeader title="Submit" />
      <IonLoading message={"Please wait..."} isOpen={submitting} />
      <IonContent fullscreen>
        <LargeHeader title="Submit" />
        <IonItem lines="full">
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
            name="title"
            value={values.title}
            type="text"
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            name="description"
            value={values.description}
            type="text"
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">URL</IonLabel>
          <IonInput
            name="url"
            value={values.url}
            type="url"
            onIonChange={handleChange}
            required
          />
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              disabled={submitting}
              onClick={handleSubmit}
            >
              Publish Product
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Submit;
