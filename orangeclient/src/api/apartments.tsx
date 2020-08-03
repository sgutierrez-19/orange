import { server } from './server';

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
