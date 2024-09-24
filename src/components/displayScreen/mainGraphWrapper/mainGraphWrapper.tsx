"use client";

import React from "react";
import style from "./mainGraphWrapper.module.css";
import { Container, CssBaseline } from "@mui/material";
import Labels from "@/utils/labels";
import LabTabs from "../tabsWrapper/labTabs";
import ReactPlotly from "react-plotly.js";

interface IMainGraphWrapper {
  graph: any;
  descriptionMainGraph: IDescriptionMainGraph;
}

type GraphData = {
  Response:number,
  Count:number,
  Color:string
}  

const MainGraphWrapper = ({
  graph,
  descriptionMainGraph,
}: IMainGraphWrapper) => {
  const res = (
    <div
      dangerouslySetInnerHTML={{
        __html: descriptionMainGraph.shortDescription,
      }}
    />
  );

  const sortedData:GraphData[] = graph.data.sort(
    (a: { Response: number }, b: { Response: number }) => a.Response - b.Response
  );

  const xArr:number[] = sortedData.map((item: { Response: number }) => item.Response);
  const yArr:number[] = sortedData.map((item: { Count: number }) => item.Count);
  const colorArr:string[] = sortedData.map((item: { Color: string }) => item.Color);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={style.mainGraphContainer}>
        <p className={style.mainGraphContainerTitle}>{Labels.Participants}</p>
        <div className={style.mainGraphWrapper}>
          <p className={style.mainGraphWrapperTitle}>Question Title</p>
          <ReactPlotly
            style={{ width: "100%", height: "300px" }}
            data={[
              {
                type: "bar",
                x: xArr,
                y: yArr,
                text: yArr.map((y: number) => String(y)),
                marker: { color: colorArr },
              },
            ]}
            layout={graph.layout}
          />
        </div>
        <div className={style.mainGraphWrapper}>
          <p className={style.mainGraphWrapperTitle}>Question Title</p>
          <LabTabs
            shortDescription={descriptionMainGraph.shortDescription}
            detailDescription={descriptionMainGraph.detailedDescription}
          />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default MainGraphWrapper;
