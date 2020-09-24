import { server } from './server';

export async function getCurrent() {
  try {
    let response = await server.get(`/current-households`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getFuture() {
  try {
    let response = await server.get(`/future-households`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPast() {
  try {
    let response = await server.get(`/prospect-households`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getHousehold(id: number) {
  try {
    let response = await server.get(`/household/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
