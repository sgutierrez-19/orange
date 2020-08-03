import { server } from './server';

export async function getAvailableApartments() {
  try {
    let response = await server.get('/apartments');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
