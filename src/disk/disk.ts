import axios, { AxiosResponse } from "axios";
import { DiskItem } from "types";

const client = axios.create({
  baseURL: "https://cloud-api.yandex.net/v1/disk/",
  headers: {
    Accept: "application/json",
  },
  params: {
    public_key: process.env.YANDEX_PUBLIC_FOLDER_URL,
  },
});

type ResourcesResponse = {
  _embedded: {
    items: DiskItem[];
  };
};

const getResources = async (path: string) => {
  return (
    await client.get<any, AxiosResponse<ResourcesResponse>>(
      "public/resources",
      {
        params: {
          public_key: process.env.YANDEX_PUBLIC_FOLDER_URL,
          path,
        },
      }
    )
  ).data;
};

export type DownloadFileResponse = {
  href: string;
  method: string;
  templated: boolean;
};
const downloadFile = async (path: string) => {
  return (
    await client.get<any, AxiosResponse<DownloadFileResponse>>(
      "public/resources/download",
      {
        params: {
          // public_key: process.env.YANDEX_PUBLIC_FOLDER_URL,
          path,
        },
      }
    )
  ).data;
};

export const disk = {
  client,
  resources: {
    get: getResources,
  },
  files: {
    download: downloadFile,
  },
};
