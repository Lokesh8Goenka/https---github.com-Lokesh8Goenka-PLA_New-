
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface QuizResultData {
  userName: string | null;
  userClass: string | null;
  subjectName: string | null;
  totalQuizScore: number;
}

export async function saveQuizResultAction(data: QuizResultData) {
  // Check if Firebase project ID is configured as a proxy for Firebase setup
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.error('Firebase environment variables are not properly set. NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing.');
    return { success: false, error: 'Server configuration error for saving results. Firebase setup incomplete.' };
  }

  try {
    await addDoc(collection(db, 'quizResults'), {
      userName: data.userName || 'N/A',
      userClass: data.userClass || 'N/A',
      subjectName: data.subjectName || 'N/A',
      totalQuizScore: data.totalQuizScore,
      timestamp: serverTimestamp(), // Adds a server-side timestamp
    });
    return { success: true, message: 'Quiz result saved successfully to Firestore!' };
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    let errorMessage = 'Failed to save quiz result to Firestore.';
    if (error instanceof Error) {
        errorMessage = `Error saving to Firestore: ${error.message}`;
    }
    return { success: false, error: errorMessage };
  }
}
