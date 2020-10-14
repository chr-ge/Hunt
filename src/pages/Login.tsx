import React, { useState } from "react";
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
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import { toast } from "../utils/toast";
import useFormValidation, { UserInterface } from "../hooks/useFormValidation";
import validateLogin from "../components/Auth/validateLogin";
import firebase from "../firebase";
import { UserErrors } from "../components/Auth/validateSignup";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = ({ history }: RouteComponentProps) => {
  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  } = useFormValidation<UserInterface, UserErrors>(INITIAL_STATE, validateLogin, authenticateUser);
  const [busy, setBusy] = useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { email, password } = values;
    try {
      await firebase.login(email, password!);
      toast("You have logged in successfully.");
      history.push("/");
    } catch (err) {
      console.log(err.message);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Login" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="email"
            value={values.email}
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            value={values.password}
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
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Login
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="ion-text-center ion-padding vertical">
            <IonRouterLink routerLink={`/forgot-password`}>
              Forgot Password?
            </IonRouterLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
