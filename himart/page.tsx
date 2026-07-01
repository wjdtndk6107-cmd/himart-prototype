"use client";

import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import PaymentCompletePage from "./pages/PaymentCompletePage";

type Route = "login" | "home" | "search" | "cart" | "order" | "complete";

export default function HimartPage() {
  const [route, setRoute] = useState<Route>("login");

  return (
    <div className="himart-root">
      {route === "login" && (
        <LoginPage onComplete={() => setRoute("home")} />
      )}
      {route === "home" && (
        <HomePage
          onSearch={() => setRoute("search")}
          onCart={() => setRoute("cart")}
          onMy={() => setRoute("home")}
        />
      )}
      {route === "search" && (
        <SearchPage
          onHome={() => setRoute("home")}
          onCart={() => setRoute("cart")}
        />
      )}
      {route === "cart" && (
        <CartPage
          onOrder={() => setRoute("order")}
          onHome={() => setRoute("home")}
        />
      )}
      {route === "order" && (
        <OrderPage
          onComplete={() => setRoute("complete")}
          onBack={() => setRoute("cart")}
        />
      )}
      {route === "complete" && (
        <PaymentCompletePage
          onContinue={() => setRoute("home")}
        />
      )}
    </div>
  );
}
