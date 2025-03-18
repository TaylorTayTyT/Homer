import { useEffect } from "react"

interface props{
    icon: string,
    action: any,
    description?: string
}
//START HEREEEEEEEE
export default function Icon({icon, action, description} : props){
    console.log(icon)
    return(
        <div title={description} className="icon" onClick={action}> 
            <div dangerouslySetInnerHTML={{__html: icon}}></div>
            <img src="./assets/icons/bold.png"></img>
        </div>
    )
}