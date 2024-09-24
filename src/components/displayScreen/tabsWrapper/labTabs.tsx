"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import style from "./labTabs.module.css";

interface ILabTabs {
  shortDescription: string;
  detailDescription: string;
}

export default function LabTabs(props: ILabTabs) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  <div
    dangerouslySetInnerHTML={{
      __html: props.shortDescription,
    }}
  />;

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Short Description"
              value="1"
              className={style.tabWrapper}
            />
            <Tab
              label="Detailed Description"
              value="2"
              className={style.tabWrapper}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {
            <div
              dangerouslySetInnerHTML={{
                __html: props.shortDescription,
              }}
            />
          }
        </TabPanel>
        <TabPanel value="2">
          {
            <div
              dangerouslySetInnerHTML={{
                __html: props.detailDescription,
              }}
            />
          }
        </TabPanel>
      </TabContext>
    </Box>
  );
}
