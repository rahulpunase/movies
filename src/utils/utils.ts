import { Crew } from "src/interfaces/IMovie.interface";
import { notification } from "antd";
import { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

const utils = {
  getDirectorFromCrew: (crew: Array<Crew>): Crew | undefined =>
    crew.find((cr) => cr.job === "Director"),
  getProducersFromCew: (crew: Array<Crew>): Array<Crew> =>
    crew.filter((cr) => cr.job === "Producer"),
  showError: (des: string) =>
    notification.open({
      type: "error",
      message: "Error",
      description: des,
      placement: "bottom",
    }),
  showSuccess: (title: string, des?: string) =>
    notification.open({
      type: "success",
      message: title,
      description: des,
    }),
  addBuilderCases: <T>(
    asyncAction: any,
    pending: (state: WritableDraft<T>, action: PayloadAction<any, any>) => void,
    fulfilled: (
      state: WritableDraft<T>,
      action: PayloadAction<any, any>
    ) => void,
    rejected: (state: WritableDraft<T>, action: PayloadAction<any, any>) => void
  ) => ({
    [asyncAction["pending"]]: pending,
    [asyncAction["fulfilled"]]: fulfilled,
    [asyncAction["rejected"]]: rejected,
  }),
  convertObjectToQueryParam: (object: any): string => {
    const keys = Object.keys(object);
    let str = "";
    keys.forEach((key: any) => {
      str += `${key}=${object[key]}&`;
    });
    return str;
  },
};

export default utils;
