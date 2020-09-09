import { server } from './server';

export async function getApartment(id: number) {
  try {
    let response = await server.get(`/apartment/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getApartmentByAptNum(aptNum: String) {
  try {
    let response = await server.get(`/apartment-num/${aptNum}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllApartments() {
  try {
    let response = await server.get('/apartments');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAvailApartments() {
  try {
    let response = await server.get('/get-available');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
