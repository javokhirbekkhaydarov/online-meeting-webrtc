import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

export const createOffer = async (
  offer: RTCSessionDescriptionInit,
  roomId: string
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  await setDoc(roomRef, { offer });
};

export const createAnswer = async (
  answer: RTCSessionDescriptionInit,
  roomId: string
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  await setDoc(roomRef, { answer });
};

export const onOffer = (
  roomId: string,
  callback: (offer: RTCSessionDescriptionInit) => void
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  return onSnapshot(roomRef, (doc) => {
    const data = doc.data();
    if (data && data.offer) {
      callback(data.offer);
    }
  });
};

export const onAnswer = (
  roomId: string,
  callback: (answer: RTCSessionDescriptionInit) => void
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  return onSnapshot(roomRef, (doc) => {
    const data = doc.data();
    if (data && data.answer) {
      callback(data.answer);
    }
  });
};
