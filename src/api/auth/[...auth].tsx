// // pages/api/auth/[...auth].js

// import { NextApiRequest, NextApiResponse } from 'next';
// import { ConfidentialClientApplication } from '@azure/msal-node';

// // MSAL config
// const msalConfig = {
//   auth: {
//     clientId: process.env.AZURE_AD_CLIENT_ID,
//     authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`,
//     clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
//   },
// };

// const cca = new ConfidentialClientApplication(msalConfig);

// export default async function authHandler(req: NextApiRequest, res: NextApiResponse) {
//   const { query } = req;
//   const { code } = query; // The authorization code that Azure AD returns

//   if (!code) {
//     return res.status(400).json({ error: 'Code not provided' });
//   }

//   // Configuration for the token request
//   const tokenRequest = {
//     code,
//     scopes: ["user.read"], // Replace with actual scopes needed for your application
//     redirectUri: process.env.AZURE_AD_REDIRECT_URI, // The same redirect URI registered in Azure AD
//   };

//   try {
//     // Exchange the authorization code for an access token
//     const response = await cca.acquireTokenByCode(tokenRequest);

//     // Here you would typically set cookies or a session with the returned token(s)
//     // For demonstration purposes, let's just return the token response
//     return res.status(200).json(response);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Error acquiring token' });
//   }
// }
