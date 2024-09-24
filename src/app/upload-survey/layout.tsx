import AzureBlobStorage from "@/services/AZBlobStorage";
import React from "react";

const UploadFilesLayout = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ width: "80vw", margin: "auto" }}>{children}</div>;
};

export default UploadFilesLayout;
