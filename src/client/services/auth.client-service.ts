import { User } from '@/types/user.types';
import { Axios } from '../config/axios';
import { getAuth, signOut, UserCredential } from 'firebase/auth';
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

	static async signUp(credentials: UserCredential, user: CreateUserDtoType) {
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
