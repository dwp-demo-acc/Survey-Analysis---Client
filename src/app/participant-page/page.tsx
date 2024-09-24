"use client";
import { useEffect, useState } from "react";
import IconBreadcrumbs from "@/utils/breadcrumb";
import ParticipantsDataWrapper from "@/components/participantsPage/participantsDataWrapper/participantsDataWrapper";
import SegmentationParticipantWrapper from "@/components/participantsPage/segmentationWrapper/segmentationParticipantWrapper";
import { postData } from "@/api/getDataInsight";
import Loader from "@/components/shared/Loader/Loader";

interface IParticipantData {
  num_duplicated_answer: number;
  num_of_survey_participants: number;
  uncompleted_answers: number;
  graphs: any[];
}

const ParticipantPage = () => {
  const [participantData, setParticipantData] = useState<IParticipantData>();
  // const [graphData, setGraphData] = useState<any[]>([]);
  const queryParams = new URLSearchParams(window.location.search);
  const homepageUrl = queryParams.get("homepageUrl");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const newFileName = decodeURIComponent(homepageUrl as string);
      const fileNameToSend = newFileName.split("_")[1];
      const responses = await postData("http://127.0.0.1:5000/survey-participants-page", {
        file_name: fileNameToSend,
      });
      setIsLoading(false);
      const data: IParticipantData = responses;
      setParticipantData(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isLoading && <Loader />}
      {participantData && (
        <>
          <IconBreadcrumbs homePage={homepageUrl!} currentPage="Participant Page" />
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <ParticipantsDataWrapper participantData={participantData} />
            <SegmentationParticipantWrapper graphDataWrapper={participantData.graphs} />
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipantPage;
