interface props{
    icon: string,
    action: any,
    description?: string
}
export default function Icon({icon, action, description} : props){
    return(
            <div title={description} className="icon" onClick={action} dangerouslySetInnerHTML={{__html: icon}}></div>

    )
}