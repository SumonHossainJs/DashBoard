import React, { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
