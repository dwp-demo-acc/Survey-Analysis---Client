import style from "./segmentationParticipantWrapper.module.css";
import ReactPlotly from "react-plotly.js";
import labels from "@/utils/labels";
interface ISegmentationGraphWrapper {
  graphDataWrapper: any;
}

const SegmentationParticipantWrapper = (props: ISegmentationGraphWrapper) => {
  const graphs: any[] = props.graphDataWrapper;
  return (
    <div className={style.wrapper} style={{ overflow: "auto" }}>
      <p className={style.wrapperTitle}>{labels.allSegmentation}</p>
      {graphs.map((item, index) => {
        const filteredData: any = item["graphData"].data.filter(
          (dataItem: any) => dataItem.Count > labels.filterLimit
        );
        const sortedData: any = filteredData.sort(
          (a: { Response: string }, b: { Response: string }) =>
            b.Response >= a.Response
        );

        const xArr: string[] = sortedData
          .map((item: { Response: string }) => item.Response)
          .reverse();
        const yArr: number[] = sortedData
          .map((item: { Count: number }) => item.Count)
          .reverse();

        return (
          <div
            key={index}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          >
            <div className={style.graphWrapper}>
              <p>{item["question"]}</p>
              <ReactPlotly
                style={{ height: "250px", width: "95%" }}
                key={index}
                data={[
                  {
                    type: "bar",
                    x: xArr,
                    y: yArr,
                    text: yArr.map((y: number) => String(y)),
                  },
                ]}
                layout={{ title: item.columnName }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SegmentationParticipantWrapper;
