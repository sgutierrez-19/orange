import { server } from './server';

export async function getResLedger(householdId: number) {
  try {
    let response = await server.get(`/ledger/${householdId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getResLedgerRows(householdId: number) {
  try {
    let response = await server.get(`/ledger-rows/${householdId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}