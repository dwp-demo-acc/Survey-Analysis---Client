"use client";

import React from "react";
import ReactPlotly from "react-plotly.js";
import style from "./graphsDisplay.module.css";
import InsightGraph from "../insightGraph/insightGraph";
import Container from "@mui/material/Container";
import Labels from "@/utils/labels";

interface IGraphsDisplayProps {
  graphs: IGraphWrapper[];
  homepageUrl:string;
}

const GraphsDisplay: React.FC<IGraphsDisplayProps> = ({ graphs,homepageUrl }) => {
  return (
    <div className={style.graphsContainer}>
      <p className={style.graphsContainerTitle}>{Labels.DataInsightInfo}</p>
      
      {graphs.map((graph, index) => { 
        const sortedData: any = graph["graphData"]?.data.sort(
          (a: { Response: number }, b: { Response: number }) => a.Response - b.Response
        );
        const xArr: number[] = sortedData.map((item: { Response: number }) => item.Response);
        const yArr: number[] = sortedData.map((item: { Count: number }) => item.Count);
        const colorArr: string[] = sortedData.map(
          (item: { Color: string }) => item.Color
        );

        return (
          <Container
            className={style.graphWrapper}
            key={`wrapper-graph${index}`}
          >
            <ReactPlotly
              style={{ width: "40%", height: "300px" }}
              key={index}
              data={[
                {
                  type: "bar",
                  x: xArr,
                  y: yArr,
                  text: yArr.map((y: number) => String(y)),
                  marker: { color: colorArr },
                },
              ]}
              layout={graph["graphData"].layout}
            />
            <InsightGraph
              insight={graph["insightData"]}
              title={graph["title"]}
              homepageUrl={homepageUrl}
            />
          </Container>
        );
      })}
    </div>
  );
};

export default GraphsDisplay;
