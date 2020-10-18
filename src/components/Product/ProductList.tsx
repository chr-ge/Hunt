import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { QuerySnapshot } from "@firebase/firestore-types";
import firebase from "../../firebase";
import ProductItem from "./ProductItem";
import formatDate from "date-fns/format";
import isYesterday from "date-fns/isYesterday";
import isToday from "date-fns/isToday";
import { IonItem, IonLabel } from "@ionic/react";

export interface Product {
  id: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  created?: number | Date;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const isTrending = location.pathname.includes("trending");

  useEffect(() => {
    const unsubscribe = getProducts();
    return () => unsubscribe();
  }, [isTrending]);

  function getProducts() {
    if (isTrending) {
      return firebase.db
        .collection("products")
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapshot);
    }
    return firebase.db
      .collection("products")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot: QuerySnapshot) {
    const products = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    setProducts(products);
  }

  let prevDate: string | null = null;

  return (
    <>
      {products.map((product, i) => {
        const result = [
          <ProductItem
            key={product.id}
            showCount={true}
            url={`/products/${product.id}`}
            product={product}
            index={i + 1}
          />,
        ];
        const currentDate = isToday(product.created!)
          ? "Today"
          : isYesterday(product.created!)
          ? "Yesterday"
          : formatDate(product.created!, "MMM d");

        if (currentDate !== prevDate && !isTrending) {
          result.unshift(
            <IonItem color="medium" lines="none" key={currentDate}>
              <IonLabel>
                <strong>{currentDate}</strong>
              </IonLabel>
            </IonItem>
          );

          prevDate = currentDate;
        }

        return <>{result}</>;
      })}
    </>
  );
};

export default ProductList;
