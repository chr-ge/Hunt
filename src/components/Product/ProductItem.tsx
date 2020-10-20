import React from "react";
import { Link } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from "@ionic/react";
import { Product } from "./ProductList";

interface ProductItemProps {
  key: string;
  showCount: boolean;
  url: string;
  product: Product;
  index: number;
}

const ProductItem = ({ product, url }: ProductItemProps) => {
  return (
    <IonCard>
      <Link to={url}>
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
              <IonThumbnail slot="start">
                <IonImg src={product.thumbnail} />
              </IonThumbnail>
              <IonLabel>
                <div className="ion-text-wrap">
                  <strong style={{ fontSize: "1rem" }}>{product.title}</strong>
                </div>
                <div className="ion-text-wrap" style={{ fontSize: "0.8rem" }}>
                  {product.description}
                </div>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </Link>
    </IonCard>
  );
};

export default ProductItem;
