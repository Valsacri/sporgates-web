import { User } from '@/types/user.types';
import { Axios } from '../config/axios';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { CreateUserDtoType } from '@/dtos/user.dto';
import { toBearerToken } from '@/helpers/http.helpers';

export class AuthClientService {
	static async signIn(email: string, password: string) {
		const credentials = await signInWithEmailAndPassword(
			getAuth(),
			email,
			password
		);

		const token = await credentials.user.getIdToken();
		const res = await Axios.post<User>('/auth/sign-in', null, {
			headers: { Authorization: toBearerToken(token) },
		});
		return res.data;
	}

	static async signUp(
		email: string,
		password: string,
		user: CreateUserDtoType
	) {
		await createUserWithEmailAndPassword(getAuth(), email, password);
		await this.signIn(email, password);
		const res = await Axios.post<User>('/auth/sign-up', user);
		return res.data;
	}

	static async signOut() {
		await signOut(getAuth());
		const res = await Axios.post<User>('/auth/sign-out');
		return res.data;
	}
}
