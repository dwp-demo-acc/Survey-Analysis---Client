import Labels from "@/utils/labels";

export async function getAllGraphs() {
  if (Labels.mode==='prod') {
    const getAllGraphs =
      "https://data-analysis-micro-service.azurewebsites.net/get-all-graphs";
    try {
      const response = await fetch(getAllGraphs);
      if (!response.ok) {
        throw new Error("Failed to fetch all graphs");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching all graphs:", error);
      throw error;
    }
  } else if(Labels.mode==='dev'){
    try {
      const response = await fetch(`/db.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch JSON");
      }
      const result = await response.json();
      console.log('result',result['file-insights-response'])
      return result['file-insights-response']
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }
}

export const postData = async (url:string = '', data: {[key:string]:string} = {}) => {
  try {
    if (Labels.mode==='prod') {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        console.error('Error: response not ok');
        return []
      }
      const responseData = await response.json();
      return responseData;
    } 
    else if(Labels.mode==='dev'){
      try {
        const param = data['file_name'] ? data['file_name'].replace(".xlsx","") : data['column_name']
        const response = await fetch(`/cache_${param}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch JSON");
        }
        const result = await response.json();
        return result
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    }
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    throw error;
  }
};

export async function getDetailScreenData(columnName: string) {
  if (Labels.mode === "prod") {
    const getAllGraphs =
      "https://data-analysis-micro-service.azurewebsites.net/get-all-graphs";
    try {
      const response = await fetch(getAllGraphs);
      if (!response.ok) {
        throw new Error("Failed to fetch all graphs");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching all graphs:", error);
      throw error;
    }
  } else if (Labels.mode === "dev") {
    try {
      const fileName = `${Labels.DetailedScreenDataPrefix}${columnName}`;
      const response = await fetch('/db.json');
      if (!response.ok) {
        console.log(response.status);
        if (response.status == 404) {
          return { notFound: true };
        }
        throw new Error("Failed to fetch JSON");
      }
      const result = await response.json();
      return result[columnName]
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }
}
