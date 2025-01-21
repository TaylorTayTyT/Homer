import { useEffect } from "react";
import "./Styles/RenderJSON.css";

interface props{
    data: any,
    first: boolean
}
export default function RenderJSON({data, first}: props){
  const right_triangle = " \u{25B6}";
    const down_triangle = " \u{25BC}";
    if (Array.isArray(data)) {
      // Render array elements
      return (
        <ul>
          {data.map((item, index) => (
            <li data-first = {first} key={index}>
              <RenderJSON data={item} first ={false} />
            </li>
          ))}
        </ul>
      );
    } else if (typeof data === 'object' && data !== null) {
      // Render object keys and values
      return (
        <ul data-first = {first}>
          {Object.entries(data).map(([key, value]) => { return (
            <li data-first = {first} key={key} className="folder dropdown">
              <strong>{key}<div className="arrow">{typeof value === 'object' && value !== null && Object.entries(value) ? right_triangle : ""}</div></strong> <RenderJSON data={value} first={false} />
            </li>
          )})}
        </ul>
      );
    } else {
      // Render primitive values
    }
  };