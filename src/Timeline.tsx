import React, { useState } from "react";
import { AddIcon, SubtractIcon } from "./Components/Logos";
import { Chrono } from "react-chrono";
import "./Styles/Timeline.css";
import TimelineAddModal from "./TimelineAddModal";

export default function Timeline() {
    // State to manage the items
    console.log('render')
    const [items, SetItems] = useState<Object[]>([]);
    const [timelineAddModal, SetTimelineAddModal] = useState(false);

    // Function to add a new item
    const addItem = () => {
        const newItem = {
            title: "New Date",
            cardTitle: "New Event",
            cardSubtitle: "This is a new event added dynamically.",
            cardDetailedText: "Details about the new event.",
        };
        SetItems([...items, newItem]); // Add the new item to the array
        SetTimelineAddModal(false);
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
            <div id="timeline_controls">
                <div dangerouslySetInnerHTML={{ __html: AddIcon }} onClick={()=>SetTimelineAddModal(true)} className="control"></div>
                <div dangerouslySetInnerHTML={{ __html: SubtractIcon }} onClick={removeItem} className="control"></div>
            </div>

            {timelineAddModal ? <TimelineAddModal addItem={addItem} SetTimelineAddModal={SetTimelineAddModal}/> : ""}

            {/* Render the Chrono component with the current items */}
            <Chrono key={items.length} items={items} mode="VERTICAL" />
        </div>
    );
}