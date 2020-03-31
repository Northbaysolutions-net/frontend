import { call, take, put } from 'redux-saga/effects';
import {FETCH_PRODUCTS_BEGIN, FILTER_BRAND, FILTER_COLOR, FILTER_SIZE, SORT_BY, RECEIVE_SINGLE_PRODUCT_REQUEST, FILTER_SEARCH, FILTER_PAGE, FILTER_GENDER} from '../constants/ActionTypes'
import getChartsApi from '../services/fetchData'
import {receiveProducts, receiveSingleProduct} from '../actions/index'

export function* chartsData() {
  while (true) {
    try {
       yield take(FETCH_PRODUCTS_BEGIN);
      const data = yield call(getChartsApi.fetchData);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}

export function* filterBrandData() {
  while (true) {
    try {
       const {brand}=yield take(FILTER_BRAND);
      const data = yield call(getChartsApi.fetchData,brand.category, brand.color, brand.size, brand.sortBy, brand.search, brand.page, brand.gender);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}

export function* filterColorData() {
  while (true) {
    try {
       const {color}=yield take(FILTER_COLOR);
      const data = yield call(getChartsApi.fetchData,color.category, color.color, color.size, color.sortBy, color.search, color.page, color.gender);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}
export function* filterGenderData() {
  while (true) {
    try {
       const {gender}=yield take(FILTER_GENDER);
      const data = yield call(getChartsApi.fetchData,gender.category, gender.color, gender.size, gender.sortBy, gender.search, gender.page, gender.gender);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}

export function* filterSizeData() {
  while (true) {
    try {
       const {value}=yield take(FILTER_SIZE);
      const data = yield call(getChartsApi.fetchData,value.category, value.color, value.size, value.sortBy, value.search, value.page, value.gender);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}

export function* filterSortData() {
  while (true) {
    try {
    
       const {sort_by}=yield take(SORT_BY);
      const data = yield call(getChartsApi.fetchData,sort_by.category, sort_by.color, sort_by.size, sort_by.sortBy, sort_by.search, sort_by.page, sort_by.gender);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}

export function* filterSearchData() {
  while (true) {
    try {
    
       const {search}=yield take(FILTER_SEARCH);
      const data = yield call(getChartsApi.fetchData,search.category, search.color, search.size, search.sortBy, search.search,search.page, search.gender);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}


export function* filterPageData() {
  while (true) {
    try {
    
       const {page}=yield take(FILTER_PAGE);
      const data = yield call(getChartsApi.fetchData,page.category, page.color, page.size, page.sortBy, page.search, page.page, page.gender);
      yield put(receiveProducts(data));
    } catch (error) {
      console.log(error)
    }
  }
}

export function* getSingleProduct() {
  while (true) {
    try {
    
       const {payload}=yield take(RECEIVE_SINGLE_PRODUCT_REQUEST);
      const data = yield call(getChartsApi.fetchSingleProduct,payload);
      yield put(receiveSingleProduct.success(data));
    } catch (error) {
      console.log(error)
    }
  }
}

