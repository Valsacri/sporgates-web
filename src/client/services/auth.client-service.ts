import { User } from '@/types/user.types';
import { Axios } from '../config/axios';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
} from 'firebase/auth';
import { CreateUserDtoType } from '@/dtos/user.dto';
import { toBearerToken } from '@/helpers/http.helpers';

export class AuthClientService {
	static async signIn(credentials: UserCredential) {
		const token = await credentials.user.getIdToken();
		const res = await Axios.post<User>('/auth/sign-in', null, {
			headers: { Authorization: toBearerToken(token) },
		});
		return res.data;
	}

	static async signUp(
		credentials: UserCredential,
		email: string,
		firstName: string,
		lastName: string
	) {
		const uid = credentials.user.uid;
		const user: CreateUserDtoType = {
			uid,
			email,
			firstName,
			lastName,
		};
		await this.signIn(credentials);
		const res = await Axios.post<User>('/auth/sign-up', user);
		return res.data;
	}

	static async signOut() {
		await signOut(getAuth());
		const res = await Axios.post<User>('/auth/sign-out');
		return res.data;
	}
}
