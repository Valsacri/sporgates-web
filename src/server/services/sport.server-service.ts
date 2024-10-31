import { formatDocument } from '@/server/helpers/database.helper';
import { Sport } from '@/types/sport.types';
import { SportModel } from '../models/sport.model';

export class SportServerService {
	static async getAll() {
		const sports = await SportModel.find();
		return formatDocument<Sport[]>(sports);
	}
}
