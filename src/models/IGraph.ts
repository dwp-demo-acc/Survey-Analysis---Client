interface  IGraphWrapper {
    insightData: any;
    graphData: any;
    title: string;
}

interface IDescriptionMainGraph {
    shortDescription:string;
    detailedDescription:string;
}

interface ISegmentDataWrapper{
    minGraph:any;
    maxGraph:any;
    insight:string;
    title:string;
    subTitle:string;
    minGraphType:string;
    maxGraphType:string;
    maxGraphTitle:string;
    minGraphTitle:string;
}