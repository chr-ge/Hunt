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
import NavHeader from "../components/Header/NavHeader";
import { toast } from "../utils/toast";
import useFormValidation from "../hooks/useFormValidation";
import validateEditProfile from "../components/Auth/validateEditProfile";
import firebase from "../firebase";
import UserContext from "../context/UserContext";

const EditProfile = ({ history }: RouteComponentProps) => {
  const { user, setUser } = useContext(UserContext);

  const INITIAL_STATE = {
    name: user && user.displayName,
    email: user && user.email,
    currentPassword: "",
    newPassword: "",
  };

  const {
    handleSubmit,
    handleChange,
    values,
    setValues,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateEditProfile, authenticateUser);
  const [busy, setBusy] = useState(false);

  async function reauthenticate(email: string, password: string) {
    const credential = firebase.app.auth.EmailAuthProvider.credential(
      email,
      password
    );
    try {
      await user.reauthenticateWithCredential(credential);
      console.log("Reauthentication Successful");
    } catch (err) {
      console.log(err.message);
      toast(err.message);
    }
  }

  async function updateProfileItems(
    name: string,
    email: string,
    password: string
  ) {
    await user.updateProfile({
      displayName: name,
    });
    await user.updateEmail(email);
    if (password) {
      await user.updatePassword(password);
    }
  }

  async function authenticateUser() {
    setBusy(true);
    const { name, email, currentPassword, newPassword } = values;
    try {
      await reauthenticate(user.email, currentPassword!);
      await updateProfileItems(name!, email, newPassword!);
      const result = await firebase.login(
        email,
        (newPassword || currentPassword)!
      );
      setValues({
        name: user && user.displayName,
        email: user && user.email,
        newPassword: "",
        currentPassword: "",
      });
      setUser(result.user);
      toast("You have updated your profile successfully.");
      history.push("/profile");
    } catch (err) {
      console.log("Profile Update Error", err);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Edit Profile" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            name="name"
            type="text"
            value={values.name}
            onIonChange={handleChange}
            required
          />
        </IonItem>
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
          <IonLabel position="floating">Current Password</IonLabel>
          <IonInput
            name="currentPassword"
            type="password"
            value={values.currentPassword}
            onIonChange={handleChange}
          />
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">New Password</IonLabel>
          <IonInput
            name="newPassword"
            type="password"
            value={values.newPassword}
            onIonChange={handleChange}
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
              Save Changes
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
