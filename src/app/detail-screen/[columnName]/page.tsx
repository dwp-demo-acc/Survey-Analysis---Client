"use client";

import React, { useEffect, useState } from "react";
import style from "./detailScreen.module.css";
import { getDetailScreenData, postData } from "@/api/getDataInsight";
import MainGraphWrapper from "@/components/displayScreen/mainGraphWrapper/mainGraphWrapper";
import SegmentationWrapper from "@/components/displayScreen/segmentationWrapper/segmentationWrapper";
import IconBreadcrumbs from "@/utils/breadcrumb";
import Loader from "@/components/Loader/Loader";

const DetailScreen = ({ params }: { params: { columnName: string } }) => {
  const [mainGraph, setMainGraph] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const queryParams = new URLSearchParams(window.location.search);
  const homepageUrl = queryParams.get("homepageUrl");
  const decodedHomepageUrl = decodeURIComponent(homepageUrl!);
  const columnName = decodeURIComponent(params.columnName);
  const [mainGraphTitle, setMainGraphTitle] = useState<string>("");
  const [descriptionMainGraph, setDescriptionMainGraph] = useState<IDescriptionMainGraph>();
  const [segmentData, setSegmentData] = useState<ISegmentDataWrapper[]>([]);
  const initMainGraph = (dataMainGraph: any): void => {
    setMainGraph(dataMainGraph);
  };
  const initMainGraphDescription = (detailedDesc: string, shortDesc: string): void => {
    setDescriptionMainGraph({
      detailedDescription: detailedDesc,
      shortDescription: shortDesc,
    });
  };

  const initSegmentData = (segmentationData: any[]): void => {
    const segmentDataArr: ISegmentDataWrapper[] = [];
    for (let item of segmentationData) {
      const dataGraphMin = item["graph_min_lvl_2"];
      const dataGraphMax = item["graph_max_lvl_2"];
      const elem: ISegmentDataWrapper = {
        minGraph: dataGraphMin.data,
        minGraphType: dataGraphMin.type,
        maxGraph: dataGraphMax.data,
        maxGraphType: dataGraphMax.type,
        maxGraphTitle: dataGraphMax.title,
        minGraphTitle: dataGraphMin.title,
        insight: item["insight"],
        title: item["title"],
        subTitle: item["sub_title"],
      };
      segmentDataArr.push(elem);
    }
    setSegmentData(segmentDataArr);
  };

  useEffect(() => {
    const fetchDetailScreenDataByName = async (fileName: any) => {
      let title = "";
      title = fileName.replace(/%20/g, " ");
      const response = await postData("http://127.0.0.1:5000/get_question_plot_details", {
        column_name: title,
      });

      // const response = await getDetailScreenData(title);
      if (response === undefined || response.notFound) {
        window.location.href = "/custom404";
        return;
      }

      const dataMainGraph = response["graph_lvl_1"]["data"];
      const mainGraphTitle = response["graph_lvl_1"]["title"];
      setMainGraphTitle(mainGraphTitle);
      const detailedDescription = response["insights"]["column_insight_detailed_summary"];
      const shortDescription = response["insights"]["column_insight_short_summary"];
      const segmentationData: any[] = response["cards"];
      initSegmentData(segmentationData);

      initMainGraph(dataMainGraph);
      initMainGraphDescription(detailedDescription, shortDescription);
      setIsLoading(false);
    };

    fetchDetailScreenDataByName(columnName);
  }, [columnName]);

  return (
    <div>
      <IconBreadcrumbs homePage={decodedHomepageUrl} currentPage="Detail Screen" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.detailScreenWrapper}>
          {mainGraph && descriptionMainGraph && (
            <>
              <MainGraphWrapper graph={mainGraph} descriptionMainGraph={descriptionMainGraph} />
              <SegmentationWrapper data={segmentData} title={mainGraphTitle} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
