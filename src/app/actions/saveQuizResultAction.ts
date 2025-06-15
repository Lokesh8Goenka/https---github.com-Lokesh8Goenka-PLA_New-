'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

interface QuizResultData {
  userName: string | null;
  userClass: string | null;
  subjectName: string | null;
  totalQuizScore: number;
}

// Helper to format the private key
function formatPrivateKey(key: string): string {
  return key.replace(/\\n/g, '\n');
}

export async function saveQuizResultAction(data: QuizResultData) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !clientEmail || !privateKey) {
    console.error('Google Sheets environment variables are not properly set.');
    return { success: false, error: 'Server configuration error for saving results.' };
  }

  try {
    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: formatPrivateKey(privateKey),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsByTitle[title]
    
    if (!sheet) {
        console.error('Google Sheet not found (index 0). Make sure your sheet exists.');
        return { success: false, error: 'Spreadsheet not found.' };
    }

    // Ensure header row exists or add it
    const headerValues = ['Timestamp', 'Name', 'Class', 'Subject', 'Total Score'];
    const currentHeader = await sheet.headerValues;
    if (!currentHeader || currentHeader.join(',') !== headerValues.join(',')) {
        await sheet.setHeaderRow(headerValues);
    }

    const row = {
      Timestamp: new Date().toISOString(),
      Name: data.userName || 'N/A',
      Class: data.userClass || 'N/A',
      Subject: data.subjectName || 'N/A',
      'Total Score': data.totalQuizScore,
    };

    await sheet.addRow(row);
    return { success: true, message: 'Quiz result saved successfully!' };
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    let errorMessage = 'Failed to save quiz result.';
    if (error instanceof Error) {
        // Check for common auth errors
        if (error.message.includes('Invalid G Suite domain') || error.message.includes('permission denied') || error.message.includes('Unable to load endpoint https')) {
            errorMessage = 'Sheet permission or API setup error. Check sharing settings and API key validity.';
        } else if (error.message.includes('Request failed with status code 404')) {
             errorMessage = 'Sheet not found. Verify GOOGLE_SHEET_ID.';
        }
    }
    return { success: false, error: errorMessage };
  }
}
