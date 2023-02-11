import { db } from "./firebase-config";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";

export const amountFormatter = (amount) => {
  if (amount === 0) {
    return "$0";
  } else {
    return `$${amount}`;
  }
};

export const getDonationByMemberId = async (id) => {
  const categoryDocRef = doc(db, `/members/${id}`);

  const q = query(
    collection(db, "donation"),
    where("donorId", "==", categoryDocRef)
  );

  const ticketDocsSnap = await getDocs(q);
  const responseContent = ticketDocsSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return responseContent;
};

export const getMembers = async () => {
  const membersCollection = collection(db, "members");
  const data = await getDocs(membersCollection);
  const responseContent = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return responseContent;
};

export const aggregateCalculator = (data) => {
  let total = 0;
  for (const property in data) {
    total += data[property];
  }
  return amountFormatter(total);
};

export const getDonationByDonationId = async (id) => {
  const docRef = doc(db, "donation", id);
  let response;
  try {
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    response = docSnap.data();
  } catch (error) {
    console.log(error);
  }
  console.log(response);
  return response;
};

export const getCurrentDate = () => {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = mm + "/" + dd + "/" + yyyy;
  return today;
};
