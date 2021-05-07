import React from "react";
import shoppingImage from "../assets/shopping.png";
import { Placeholder } from "./components/Placeholder";

export function ShoppingScreen(): React.ReactElement {
    return (
        <Placeholder
            image={shoppingImage}
            message="Just running to the shops..."
        />
    );
}
