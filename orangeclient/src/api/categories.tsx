import { server } from './server';

export async function getCategories() {
  try {
    let response = await server.get(`/categories`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
