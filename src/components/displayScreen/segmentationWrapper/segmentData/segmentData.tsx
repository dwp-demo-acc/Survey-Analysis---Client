import React from "react";
import ReactPlotly from "react-plotly.js";
import LegendBar from "../../legendBar/legendBar";
import Labels from "@/utils/labels";
import style from "./segmentData.module.css";

const SegmentData = ({
  segmentData,
  title,
}: {
  segmentData: ISegmentDataWrapper;
  title: string;
}) => {
  const whichLegend = title.startsWith("sentiment_")
    ? Labels.sentimentLegend
    : Labels.fullLegend;
  const satisfactionLevelColors: { [level: string]: string } = {
    "Very Low": Labels.colors.VERY_LOW_COLOR,
    Low: Labels.colors.LOW_COLOR,
    "Moderately Low": Labels.colors.MODERATELY_LOW_COLOR,
    Moderate: Labels.colors.MODERATE_COLOR,
    "Moderately High": Labels.colors.MODERATELY_HIGH_COLOR,
    High: Labels.colors.HIGH_COLOR,
    "Very High": Labels.colors.VERY_HIGH_COLOR,
  };

  const pieChartDataMax = [
    {
      labels: Object.values(segmentData.maxGraph).map(
        (item: any) => item["Satisfaction Level"]
      ),
      values: Object.values(segmentData.maxGraph).map(
        (item: any) => item["Count"]
      ),
      marker: {
        colors: Object.values(segmentData.maxGraph).map(
          (item: any) => satisfactionLevelColors[item["Satisfaction Level"]]
        ),
      },
      type: "pie" as const,
    },
  ];

  const pieChartDataMin = [
    {
      labels: Object.values(segmentData.minGraph).map(
        (item: any) => item["Satisfaction Level"]
      ),
      values: Object.values(segmentData.minGraph).map(
        (item: any) => item["Count"]
      ),
      marker: {
        colors: Object.values(segmentData.minGraph).map(
          (item: any) => satisfactionLevelColors[item["Satisfaction Level"]]
        ),
      },
      type: "pie" as const,
    },
  ];


  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ReactPlotly
          style={{ width: "50%", height: "400px" }}
          data={pieChartDataMax}
          layout={{ showlegend: false, title: segmentData.maxGraphTitle }}
        />
        <ReactPlotly
          style={{ width: "50%", height: "400px" }}
          data={pieChartDataMin}
          layout={{ showlegend: false, title: segmentData.minGraphTitle }}
        />
      </div>
      <div id="insight" style={{}}>
        <LegendBar legend={whichLegend} />
        <p className={style.insightSubTitle}>{segmentData.subTitle}</p>
        <div
          className={style.contentInsight}
          dangerouslySetInnerHTML={{
            __html: segmentData.insight,
          }}
        />
      </div>
    </div>
  );
};

export default SegmentData;
