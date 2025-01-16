import { useEffect } from "react";
import "./Styles/RenderJSON.css";

interface props{
    data: any,
    first: boolean
}
export default function RenderJSON({data, first}: props){
    useEffect(()=>{
        //drop down implementation
        document.querySelectorAll("li").forEach((elem: HTMLElement) => {
            elem.addEventListener('click', (e) => {
              const target = e.currentTarget as HTMLElement; // Get the clicked li element
              console.log(target)
              const ulElements = target.querySelectorAll("ul"); // Find all nested ul elements
          
              ulElements.forEach((ulElement: HTMLElement) => {
                // Toggle the "active" class for the nested ul elements
                ulElement.classList.toggle("active");
                
                // Optionally toggle the "active" class on the li elements within the clicked ul
                ulElement.querySelectorAll("li").forEach((liElement: HTMLElement) => {
                  liElement.classList.toggle("active");
                });
              });
          
              // Prevent the click event from propagating to parent elements, avoiding unwanted behavior
              
            });
          });
    }, [])
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