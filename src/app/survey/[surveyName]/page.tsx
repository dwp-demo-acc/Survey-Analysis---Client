"use client";

import { getAllGraphs, postData } from "@/api/getDataInsight";
import ExecutiveSummery from "@/components/homePage/executiveSummery/executiveSummery";
import { useState, useEffect } from "react";
import IconBreadcrumbs from "@/utils/breadcrumb";
import GraphsDisplay from "@/components/homePage/graphsDisplay/graphsDisplay";
import Loader from "@/components/Loader/Loader";
import style from "./surveyName.module.css";
import { Alert, Snackbar } from "@mui/material";

export default function SurveyPage({ params }: { params: { surveyName: string } }) {
  const [graphs, setGraphs] = useState<IGraphWrapper[]>([]);
  const [executiveSummaryData, setExecutiveSummaryData] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchError, setIsFetchError] = useState<boolean>(false);

  const [message, setMessage] = useState({
    open: false,
    text: "",
  });

  const initGraphs = (data: any[]): void => {
    const items: IGraphWrapper[] = [];
    if (data.length === 0) {
      setIsFetchError(true);
      console.log("something get wrong with fetch graphs");
    }

    for (let item of data) {
      const elem: IGraphWrapper = {
        insightData: item.column_insight_ultra_summary,
        graphData: item.plot_chart,
        title: item.question,
      };
      items.push(elem);
    }

    setGraphs(items);
  };

  const initExecutiveSummary = (data: any) => {
    setExecutiveSummaryData(data);
  };

  useEffect(() => {
    const fetchSurveyDataByName = async (fileName: string | string[] | undefined) => {
      try {
        const newFileName = decodeURIComponent(fileName as string);
        const fileNameToSend = newFileName.split("_")[1];

        const responses = await postData("http://127.0.0.1:5000/survey-insights-report", {
          file_name: fileNameToSend,
        });

        if (responses.length === 0) {
          setMessage({ text: "Your Survey result is not ready yet , please come back later", open: true });
          return;
        }
        if (responses === undefined) {
          window.location.href = "/custom404";
          return;
        }

        const dataGraphs: any[] = responses["graphs_data"];
        const dataExecutiveSummary: string = responses["executive_page_summary"];
        const htmlText = dataExecutiveSummary.replace(/\n\n/g, "<br>").replace(/\n/g, "<br>");
        initGraphs(dataGraphs);
        initExecutiveSummary(htmlText);
      } catch (error: any) {
        console.error(error);
        setMessage({ text: error.message, open: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyDataByName(params.surveyName);
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={message.open}
        message={message.text}
        onClose={() => setMessage({ text: "", open: false })}
      />
      {isFetchError && (
        <div className={style.centerContainer}>
          <p className={style.errorMsg}>something get wrong with fetch graphs</p>
        </div>
      )}
      {graphs !== undefined && graphs.length !== 0 && (
        <div>
          <IconBreadcrumbs homePage={params.surveyName} />
          {graphs.length > 0 && executiveSummaryData && (
            <div>
              <ExecutiveSummery content={executiveSummaryData} homepageUrl={params.surveyName} />
              <GraphsDisplay graphs={graphs} homepageUrl={params.surveyName} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
