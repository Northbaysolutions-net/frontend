import { all } from "redux-saga/effects";
import { chartsData , filterBrandData, filterColorData, filterSizeData, filterSortData, getSingleProduct, filterSearchData, filterPageData, filterGenderData} from "./workflowSaga";

export function* rootSaga() {
  yield all([chartsData(), filterBrandData(), filterColorData(), filterSizeData(), filterSortData(), getSingleProduct(), filterSearchData(), filterPageData(), filterGenderData()]);
}
