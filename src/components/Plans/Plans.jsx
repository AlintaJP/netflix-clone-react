import React, { useContext, useEffect, useState } from "react";
import "./Plans.css";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { UserContext } from "../../context/userContext";
import db from "../../firebase";

const Plans = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getDocs(
      query(collection(collection(db, "customers"), user.uid, "subscriptions"))
    ).then((querySnapshot) =>
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      })
    );
  }, [user.uid]);

  useEffect(() => {
    getDocs(
      query(collection(db, "products"), where("active", "==", true))
    ).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

        priceSnap.docs.forEach((priceDoc) => {
          products[productDoc.id].prices = {
            priceId: priceDoc.id,
            priceData: priceDoc.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(collection(db, "customers"), user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occurred: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`plans__plan ${
              isCurrentPackage && "plans__plan--disabled"
            }`}
          >
            <div className="plans__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
