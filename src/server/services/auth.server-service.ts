import { auth } from 'firebase-admin';
import { UserModel } from '../models/user.model';
import { SignUpDtoType } from '@/dtos/user.dto';
import { UserServerService } from './user.server-service';

export class AuthServerService {
	static async signUp(data: SignUpDtoType) {
		return await UserModel.create(data);
	}

	static async signIn(token: string) {
		const { uid } = await auth().verifyIdToken(token);
		
		return await UserServerService.getOneByUid(uid);
	}
}
