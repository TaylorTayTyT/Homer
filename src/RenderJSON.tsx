import { useEffect } from "react";
import "./Styles/RenderJSON.css";

interface props{
    data: any,
    first: boolean
}
export default function RenderJSON({data, first}: props){
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
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li data-first = {first} key={key} className="folder dropdown">
              <strong>{key}&#x25BC;</strong> <RenderJSON data={value} first={false} />
            </li>
          ))}
        </ul>
      );
    } else {
      // Render primitive values
    }
  };