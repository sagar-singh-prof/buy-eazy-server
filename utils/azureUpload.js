import { BlobServiceClient } from "@azure/storage-blob";


export const uploadToAzure = async (file) => {

  const account = process.env.AZURE_STORAGE_ACCOUNT;

  const key = process.env.AZURE_STORAGE_KEY;

  const containerName = process.env.AZURE_CONTAINER;


  const connectionString = `DefaultEndpointsProtocol=https;AccountName=${account};AccountKey=${key};EndpointSuffix=core.windows.net`;

  const blobService = BlobServiceClient.fromConnectionString(connectionString);
  const container = blobService.getContainerClient(containerName);

  await container.createIfNotExists();

  const fileName = `${Date.now()}-${file.originalname}`;

  const blockBlob = container.getBlockBlobClient(fileName);

  await blockBlob.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype,
    },
  });

  return blockBlob.url;
};
