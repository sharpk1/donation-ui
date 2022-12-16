import { db } from "./firebase-config";
import { doc, query, collection, where, getDocs } from "firebase/firestore";

export const amountFormatter = (amount) => {
  if (amount === 0) {
    return "$0";
  } else {
    return `$${amount}`;
  }
};

export const getDonationById = async (id) => {
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
