import { server } from './server';

export async function getRes(resId: number) {
  try {
    let response = await server.get(`/resident/${resId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentRes() {
  try {
    let response = await server.get(`/current-residents`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getFutureRes() {
  try {
    let response = await server.get(`/future-residents`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPastRes() {
  try {
    let response = await server.get(`/past-residents`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getprospectiveRes() {
  try {
    let response = await server.get(`/prospective-residents`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
