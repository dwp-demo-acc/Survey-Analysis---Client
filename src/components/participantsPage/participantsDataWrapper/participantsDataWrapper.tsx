
import style from './participantsDataWrapper.module.css'

interface IParticipantData {
  num_duplicated_answer:number;
  num_of_survey_participants:number;
  uncompleted_answers:number
}

const ParticipantsDataWrapper = ({ participantData }: { participantData: IParticipantData })=>{

    return  <div style={{ display: "flex", flexDirection: "column" }}>
    <div className={style.participantsBoxWrapper}>
      Participants
      <div className={style.participantsBox}>
        <p>Overall Participants</p>
        <h1>{participantData?.num_of_survey_participants}</h1>
      </div>
    </div>
    <div className={style.resultsDeletedBoxWrapper}>
      Results Deleted
      <div className={style.BoxWrapper}>
        <div className={style.participantsBox}>
          <p> Duplicate Responses</p>
          <h1>{participantData?.num_duplicated_answer}</h1>
        </div>
        <div className={style.participantsBox}>
          <p> Incomplete Responses</p>
          <h1>{participantData?.uncompleted_answers}</h1>
        </div>
      </div>
      {/* <div className={style.BoxWrapper}>
        <div className={style.participantsBox}>
          <p> Response Time Analysis</p>
          <h1>N/A</h1>
        </div>
        <div className={style.participantsBox}>
          <p> Response Consistency</p>
          <h1>0</h1>
        </div>
      </div> */}
    </div>
  </div>
} 

export default ParticipantsDataWrapper