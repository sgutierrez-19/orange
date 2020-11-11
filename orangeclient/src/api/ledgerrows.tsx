import { server } from './server';

export async function createRow(
  hhId: number,
  date: String,
  catId: number,
  description: String,
  amount: String
) {
  try {
    let reqBody = { hhId, date, catId, description, amount };
    let response = await server.post(`/new-ledger-row`, reqBody);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
