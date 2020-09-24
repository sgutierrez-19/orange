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

export async function reserveApt(
  aptNumber: String,
  householdId: number,
  date: String
) {
  try {
    let reqObj = { aptNumber, householdId, date };
    let response = await server.patch('/reserve', reqObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function moveIn(
  aptNumber: String,
  householdId: number,
  date: String
) {
  try {
    let reqObj = { aptNumber, householdId, date };
    let response = await server.patch('/move-in', reqObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function giveNotice(
  aptNumber: String,
  householdId: number,
  date: String
) {
  try {
    let reqObj = { aptNumber, householdId, date };
    let response = await server.patch('/notice', reqObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function moveOut(
  aptNumber: String,
  householdId: number,
  date: String
) {
  try {
    let reqObj = { aptNumber, householdId, date };
    let response = await server.patch('/move-out', reqObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
