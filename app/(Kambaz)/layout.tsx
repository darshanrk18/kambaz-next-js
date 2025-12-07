"use client";
import { Provider } from "react-redux";
import store from "./store";
import Session from "./Account/Session";
import KambazNavigation from "./Navigation";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Session>
        <div style={{ display: "flex" }}>
          <KambazNavigation />
          <div style={{ flexGrow: 1, marginLeft: "120px" }}>
            {children}
          </div>
        </div>
      </Session>
    </Provider>
  );
}