import "./Styles/TimelineAddModal.css";
interface props{
    addItem: any, 
    SetTimelineAddModal: any
}
export default function TimelineAddModal({addItem, SetTimelineAddModal} : props) {
    return (
        <div id="timeline_add_modal">
            <label>Title</label>
            <input id = "title_input"></input>
            <label>Card Title</label>
            <input id = "card_title_input"></input>
            <label>Card Subitle</label>
            <input id="card_subtitle_input"></input>
            <label>Card Detailed Text</label>
            <input id="card_detailed_text_input"></input>
            <div className="controls">
                <div className="control" onClick={() =>{
                    addItem(); //start here to actually have the values inputted in timeline
                }}>add</div>
                <div className="control" onClick={()=>SetTimelineAddModal(false)}>cancel</div>
            </div>
        </div>
    )
}