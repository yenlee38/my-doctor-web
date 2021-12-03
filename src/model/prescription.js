import { API_URL, HEADER } from "../constant";

export const getAll = async (recordId) => {
  try {
    const response = await fetch(API_URL + `/prescription/${recordId}`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const createPrescription = async (recordId, amount, name, use) => {
  return await fetch(API_URL + `/prescription`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      recordId: recordId,
      name: name,
      amount: amount,
      use: use,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
