import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
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
import NavHeader from "../components/Header/NavHeader";
import { toast } from "../utils/toast";
import useFormValidation from "../hooks/useFormValidation";
import validatePasswordReset from "../components/Auth/validatePasswordReset";
import firebase from "../firebase";

const INITIAL_STATE = {
  email: "",
};

const ForgotPassword = ({ history }: RouteComponentProps) => {
  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  } = useFormValidation(
    INITIAL_STATE,
    validatePasswordReset,
    handleResetPassword
  );
  const [busy, setBusy] = useState(false);

  async function handleResetPassword() {
    setBusy(true);
    const { email } = values;
    try {
      await firebase.resetPassword(email);
      toast("Check your email to reset your password.");
      history.push("/login");
    } catch (err) {
      console.log("Password Reset Error", err);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Forgot Password" />
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

        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Send Me Reset Link
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
