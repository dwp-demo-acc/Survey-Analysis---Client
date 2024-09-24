// Define color constants
const NEGATIVE_COLOR: string = "rgb(194,61,61)";
const POSITIVE_COLOR: string = "rgb(87,210,159)";
const VERY_LOW_COLOR: string = "rgb(160,220,255)";
const LOW_COLOR: string = "rgb(98,181,229)";
const MODERATELY_LOW_COLOR: string = "rgb(0,163,224)";
const MODERATE_COLOR: string = "rgb(0,118,168)";
const MODERATELY_HIGH_COLOR: string = "rgb(0,85,135)";
const HIGH_COLOR: string = "rgb(2, 47, 151)";
const VERY_HIGH_COLOR: string = "rgb(4,30,66)";

const Labels = {
  //top nav bar:
  DeloitteNavbarTitle: "Deloitte.",
  DataInsightNavbarTitle: "Data insight",
  DataAINavbarTitle: "AI",
  UsernameNavbarTitle: "Ido Namir",

  //executive summary:
  ExecutiveSummeryTitle: "Executive Summary",
  DataInfoTitle: "Data Info Details",
  DataSetTitle: "Data Set",
  InformationDataSet: "Click here to see data for Data Set",

  //GraphsDisplay:
  DataInsightInfo: "Data Insight Info",

  //DetailScreen:
  Participants: "Participants",
  fullJsonData: "/file-insights-response",
  DetailedScreenDataPrefix: "/get_question_plot_details_",
  DetailedScreenData:
    "/get_question_plot_details_I am satisfied with the services received.json",
  SegmentationTitle: "Segmentation Title",

  // Define legend bar
  fullLegend: "full",
  regularLegend: "regular",
  sentimentLegend: "sentiment",

  //participantPage:
  allSegmentation:'All Segmentations',

  //MODE:
  mode: "dev",

  colors: {
    NEGATIVE_COLOR,
    POSITIVE_COLOR,
    VERY_LOW_COLOR,
    LOW_COLOR,
    MODERATELY_LOW_COLOR,
    MODERATE_COLOR,
    MODERATELY_HIGH_COLOR,
    HIGH_COLOR,
    VERY_HIGH_COLOR,
  },

  //FILTER LIMIT
  filterLimit:20,


};

export default Labels;