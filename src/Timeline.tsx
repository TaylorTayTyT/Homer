import React, { useState } from "react";
import { Chrono } from "react-chrono";

export default function Timeline() {
    // State to manage the items
    console.log('render')
    const [items, SetItems] = useState<Object[]>([]);

    // Function to add a new item
    const addItem = () => {
        const newItem = {
            title: "New Date",
            cardTitle: "New Event",
            cardSubtitle: "This is a new event added dynamically.",
            cardDetailedText: "Details about the new event.",
        };
        console.log([...items, newItem])
        SetItems([...items, newItem]); // Add the new item to the array
    };

    // Function to remove the last item
    const removeItem = () => {
        if (items.length > 0) {
            const updatedItems = items.slice(0, -1); // Remove the last item
            SetItems(updatedItems);
        }
    };

    // Function to update an item
    const updateItem = (index: any, updatedItem: any) => {
        const updatedItems = [...items];
        updatedItems[index] = updatedItem; // Update the item at the specified index
        SetItems(updatedItems);
    };

    return (
        <div>
            {/* Buttons to dynamically edit the timeline */}
            <button onClick={addItem}>Add Item</button>
            <button onClick={removeItem}>Remove Last Item</button>

            {/* Render the Chrono component with the current items */}
            <Chrono key = {items.length} items={items} mode="VERTICAL" />
        </div>
    );
}