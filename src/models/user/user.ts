// email          // 'eddyverbruggen@gmail.com'
// userId         // user id
// displayName    // 'Eddy Verbruggen'
// familyName     // 'Verbruggen'
// givenName      // 'Eddy'
// imageUrl       // 'http://link-to-my-profilepic.google.com'
// idToken        // idToken that can be exchanged to verify user identity.
// serverAuthCode // Auth code that can be exchanged for an access token and refresh token for offline access

export interface User {
  email: string;
  userId: string;
  displayName: string;
  imageUrl: string;
  idToken: string;
  serverAuthCode: string;
}
