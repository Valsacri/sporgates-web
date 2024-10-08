import {
	cert,
	getApp,
	getApps,
	initializeApp,
	AppOptions,
} from 'firebase-admin/app';

const firebaseAdminConfig = {
	type: process.env.FIREBASE_ADMIN_TYPE,
	project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
	private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
	client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
	auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
	token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
	auth_provider_x509_cert_url:
		process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
	universe_domain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
} as AppOptions;

export const initFirebaseAdminApp = () => {
	if (getApps().length > 0) {
		return getApp();
	}
	const credential = cert(firebaseAdminConfig);
	return initializeApp({ credential });
};
