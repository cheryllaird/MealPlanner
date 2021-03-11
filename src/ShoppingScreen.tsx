import React from "react";
import { Placeholder } from "./components/Placeholder";

export function ShoppingScreen(): React.ReactElement {
    return (
        <Placeholder
            image={require("../assets/shopping.png")}
            message="Just running to the shops..."
        />
    );
}
