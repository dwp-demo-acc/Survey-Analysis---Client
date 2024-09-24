import AzureBlobStorage from "@/services/AZBlobStorage";

export async function getListBlobsAndLog(): Promise<string[]> {
  try {
    const storage = new AzureBlobStorage();
    const res = await storage.getListBlobs();
    return res;
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

export const filterFilesNames = (files: string[]) => {
  let xlsxFiles: string[] = [];
  if (files) {
    xlsxFiles = files.filter((file) => file.endsWith(".xlsx"));
    console.log("files are", xlsxFiles);
  }
  const fileNames: string[] = xlsxFiles.map((filePath) => {
    const parts = filePath.split("/");
    return parts[parts.length - 1];
  });
  console.log("fileNames", fileNames);
  return fileNames;
};
