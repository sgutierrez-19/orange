import { server } from './server';

export async function getNotes(householdId: number) {
  try {
    let response = await server.get(`/notes/${householdId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createNote(
  householdId: number,
  date: String,
  note: String
) {
  try {
    let reqObj = { householdId, date, note };
    let response = await server.post(`/new-note`, reqObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
