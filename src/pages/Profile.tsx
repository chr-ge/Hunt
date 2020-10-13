import React, { useContext } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { personCircleOutline, mailOutline } from "ionicons/icons";
import UserContext from "../context/UserContext";
import firebase from "../firebase";
import { toast } from "../utils/toast";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";

const Profile = ({ history }: RouteComponentProps) => {
  const { user } = useContext(UserContext);

  async function logoutUser() {
    try {
      await firebase.logout();
      history.push("/login");
      toast("You have logged out successfully.");
    } catch (err) {
      console.log("Logout", err);
      toast(err.message);
    }
  }

  return (
    <IonPage>
      <SmallHeader title="Profile" />
      <IonContent fullscreen>
        <LargeHeader title="Profile" />
        {user ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={personCircleOutline} slot="start" />
                    <IonLabel>
                      <strong>{user.displayName}</strong>\<p>Username</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start" />
                    <IonLabel>
                      <strong>{user.email}</strong>\<p>Email</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={`/edit-profile`}
                  color="primary"
                  fill="outline"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={logoutUser}
                  fill="outline"
                >
                  Logout
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" routerLink={`/signup`} color="primary">
                  Sign Up
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" routerLink={`/login`} color="primary" fill="outline"> 
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
