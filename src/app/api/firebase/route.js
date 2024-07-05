import { NextResponse } from 'next/server'

 export const GET = async () => {
    try {
      const firebaseConfig = {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE,
        messagingSenderId: process.env.MESSAGE_SENDER,
        appId: process.env.APPID,
        measurementId: process.env.MEAS_IS,
      };
  
      return new NextResponse(
        JSON.stringify({
          firebaseConfig,
        }),
        { status: 200 },
      );
    } catch (error) {
      console.error("Error processing request:", error);
      return new NextResponse(
        JSON.stringify({ error: "Error processing request" }),
        { status: 500 },
      );
    }
  };