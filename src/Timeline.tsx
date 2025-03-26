import React, { MouseEventHandler, useState } from "react";
import { AddIcon, SubtractIcon } from "./Components/Logos";
import { Chrono } from "react-chrono";
import "./Styles/Timeline.css";
import TimelineAddModal from "./TimelineAddModal";
import TimelineEvent from "./Components/TimelineEvent";

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

    function moveBalls(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        function mouseUpClean(eMouse: MouseEvent) {
            eMouse.target?.removeEventListener('mousemove', adjust);
            eMouse.target?.removeEventListener('mouseup', mouseUpClean);
            const ball = e.target as HTMLDivElement;
            ball.style.zIndex = "1";
        };
        function adjust(eMouse: MouseEvent) {
            //moves the timeline
            const ball = eMouse.target as HTMLDivElement;
            console.log(ball)
            const ballPosition = ball.getBoundingClientRect().x
            console.log(ball.style)
            let currentPosition = ball.style.transform.match(/[0-9]+.[0-9]+|[0-9]+/gm);
            console.log(currentPosition)
            if(!currentPosition || currentPosition.length < 1) currentPosition = ['0']; 
            ball.style.transform = `translateX(${parseFloat(currentPosition[0]) + eMouse.x - ballPosition - ball.getBoundingClientRect().width / 2}px)`;
            console.log(ball.style.transform)
        }
        e.preventDefault();
        if (!e) return
        console.log(e.currentTarget)
        e.currentTarget.style.zIndex = "10000";
        e.currentTarget.addEventListener('mousemove', adjust)
        e.currentTarget.addEventListener('mouseup', mouseUpClean)
        e.currentTarget.addEventListener('mouseleave', mouseUpClean)
    }

    return (
        <>
            {/* Buttons to dynamically edit the timeline */}

            <div id="timeline_container">
                
                <div className="event" onMouseDown={(e) => moveBalls(e)}></div>
                <div className="event" onMouseDown={(e) => moveBalls(e)}></div>
                <div className="event" onMouseDown={(e) => console.log('mousedown')}></div>
                <div className="event" onMouseDown={(e) => console.log('mousedown')}></div>
                <div id = "timeline_line"></div>
            </div>
        </>
    );
}