import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import style from "./executiveSummery.module.css";
import labels from "@/utils/labels";
import Link from "next/link";
import Custom404 from "@/app/custom404/page";

interface IExecutiveSummeryProps {
  content: string;
  homepageUrl: string;
}

const ExecutiveSummery = (props: IExecutiveSummeryProps) => {
  const [isNonPoc, setIsNonPoc] = React.useState(false);

  // if (isNonPoc) return <Custom404 code={"0"} onBack={() => setIsNonPoc(false)} />;
  if (isNonPoc) return <Custom404 />;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={style.surveyInsightWrapper}>
        <p className={style.surveyInsightTitle}>{labels.DataInfoTitle}</p>

        <div className={style.executiveSummery}>
          <p className={style.executiveSummeryTitle}>{labels.ExecutiveSummeryTitle}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: props.content,
            }}
          />
        </div>
        <div onClick={() => setIsNonPoc(true)} className={style.dataSetWrapper}>
          <p>{labels.DataSetTitle}</p>
          <Link href={`#`}>
            {/* DONT DELETE THE NEX LINK */}
            {/* <Link href={`/participant-page?homepageUrl=${encodeURIComponent(props.homepageUrl)}`}> */}
            {labels.InformationDataSet}
          </Link>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ExecutiveSummery;
