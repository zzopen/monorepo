import fse from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import axios from 'axios'

function createStreamAxiosInstance() {
  return axios.create({
    responseType: "stream",
  });
}

const axiosStreamInstance = createStreamAxiosInstance();

export { axios, axiosStreamInstance, fse, path as nodePath, process as nodeProcess };