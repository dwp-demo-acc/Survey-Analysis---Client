import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

class AzureBlobStorage {
  private containerName: string = "data";
  private blobServiceClient!: BlobServiceClient;

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection() {
    const { AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY, AZURE_STORAGE_CONNECTION_STRING } = process.env;
    if (!AZURE_STORAGE_ACCOUNT_NAME || !AZURE_STORAGE_ACCOUNT_KEY || !AZURE_STORAGE_CONNECTION_STRING) {
      console.error("Missing Azure Storage environment variables", {
        AZURE_STORAGE_ACCOUNT_NAME,
        AZURE_STORAGE_ACCOUNT_KEY,
        AZURE_STORAGE_CONNECTION_STRING,
      });
      return;
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY);

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    this.blobServiceClient = blobServiceClient;
  }

  async getListBlobs(): Promise<string[]> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blobItems: string[] = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobItems.push(blob.name);
    }
    return blobItems;
  }

  // async downloadBlob(blobName: string, downloadDirectory: string, cb: (data: Buffer) => void): Promise<void> {
  //     const downloadFilePath = `${downloadDirectory}/${blobName}`;
  //     const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
  //     const blobClient = containerClient.getBlockBlobClient(blobName);
  //     await blobClient.downloadToFile(downloadFilePath);
  //     cb(fs.readFileSync(downloadFilePath));
  // }

  // async readBlob(blobName: string): Promise<Buffer> {
  //     try {
  //         const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
  //         const blobClient = containerClient.getBlockBlobClient(blobName);
  //         const downloadResponse = await blobClient.download();
  //         return await streamToBuffer(downloadResponse.readableStreamBody!);
  //     } catch (error:any) {
  //         if (error.statusCode === 404) {
  //             const customError = `Blob '${blobName}' not found in container '${this.containerName}'.`;
  //             console.error(customError);
  //             throw new Error(customError);
  //         } else {
  //             console.error("Error reading blob:", error);
  //             throw new Error("Error reading blob.");
  //         }
  //     }
  // }

  // async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  //     return new Promise<Buffer>((resolve, reject) => {
  //         const chunks: any[] = [];
  //         readableStream.on("data", (data: any) => {
  //             chunks.push(data instanceof Buffer ? data : Buffer.from(data));
  //         });
  //         readableStream.on("end", () => {
  //             resolve(Buffer.concat(chunks));
  //         });
  //         readableStream.on("error", reject);
  //     }
  //     );
  // }
}

export default AzureBlobStorage;
