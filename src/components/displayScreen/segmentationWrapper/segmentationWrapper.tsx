import React from "react";
import style from "./segmentationWrapper.module.css";
import { Container, CssBaseline } from "@mui/material";
import Labels from "@/utils/labels";
import SegmentData from "./segmentData/segmentData";

const SegmentationWrapper = (props: {
  data: ISegmentDataWrapper[];
  title: string;
}) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={style.segmentationGraphWrapper}>
        <p className={style.segmentationGraphWrapperTitle}>
          {Labels.SegmentationTitle}
        </p>
        {props.data.map((item: ISegmentDataWrapper, index: number) => (
          <div key={index}>
            <div className={style.mainGraphWrapper}>
              <p className={style.mainGraphWrapperTitle}>{item.title}</p>
              <SegmentData segmentData={item} title={props.title} />
            </div>
          </div>
        ))}
      </Container>
    </React.Fragment>
  );
};

export default SegmentationWrapper;
