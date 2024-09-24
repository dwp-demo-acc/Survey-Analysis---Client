"use client";

import React, { useState } from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import AzureBlobStorage from "@/services/AZBlobStorage";
import PersistentDrawerLeftWrapper from "@/components/persistentDrawerLeftWrapper";

const UploadNewSurvey = () => {
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files) return;
    const fileData = event.target?.files[0];
    if (fileData) {
      const fileType = fileData.name.split(".").pop();
      if (fileType !== "csv" && fileType !== "xlsx" && fileType !== "json") {
        setMessage({ type: "error", text: "Please upload a CSV or XLSX file  or json (json is only on poc)" });
      } else {
        setMessage(null);
        setFile(fileData);
      }
    }
  };

  const handleUploadFile = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://127.0.0.1:5000/upload-file", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.status !== 200) {
        if (response.status === 409) {
          throw new Error(`File ${file.name} already exist\nFile name must be uniq`);
        }
        throw new Error(data.message);
      } else {
        setMessage({ type: "success", text: `Successfully uploaded survey file` });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });

      console.error("Error uploading file:", error);
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setFile(null);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Upload Survey
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="body1">
            Explanation: Provide a brief explanation about the purpose of uploading a survey file and how it will be
            used for analysis.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h6" gutterBottom>
            Upload Survey Files (csv / json format only )
          </Typography>
          <input onChange={handleFileChange} type="file" />
          {message && <Typography color={message.type === "error" ? "error" : "green"}>{message.text}</Typography>}
          <Button disabled={!file} variant="contained" color="primary" onClick={handleUploadFile}>
            Upload
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UploadNewSurvey;
