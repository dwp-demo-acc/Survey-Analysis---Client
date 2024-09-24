import Link from "next/link";
import style from "./insightGraph.module.css";

interface InsightGraphProps {
  insight: any;
  title: string;
  homepageUrl:string;
}

const InsightGraph = (props: InsightGraphProps) => {
  const insight = props.insight;
  const title = props.title.replace(/%20/g, ' ');
  return (
    <div className={style.insightGraphTextWrapper}>
        <Link href={`/detail-screen/${title}?homepageUrl=${encodeURIComponent(props.homepageUrl)}`}> {props.title}</Link>
      <div
        dangerouslySetInnerHTML={{
          __html: insight,
        }}
      />
    </div>
  );
};

export default InsightGraph;
