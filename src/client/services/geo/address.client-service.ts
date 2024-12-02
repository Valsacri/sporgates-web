import { Axios } from '@/client/config/axios';
import { CreateAddressDtoType, UpdateAddressDtoType } from '@/dtos/item/general.dto';
import { Address } from '@/types/geo.types';

export class AddressClientService {
	static async getOne(id: string) {
		const res = await Axios.get<Address>(`/geo/addresses/${id}`);
		return res.data;
	}

	static async getByUser(userId: string) {
		const res = await Axios.get<Address[]>('/geo/addresses', {
			params: {
				user: userId,
			},
		});
		return res.data;
	}

	static async getByBusiness(businessId: string) {
		const res = await Axios.get<Address[]>('/geo/addresses', {
			params: {
				business: businessId,
			},
		});
		return res.data;
	}

	static async create(address: CreateAddressDtoType) {
		const res = await Axios.post<Address>('/geo/addresses', address);
		return res.data;
	}

	static async update(id: string, address: UpdateAddressDtoType) {
		const res = await Axios.patch<Address>(`/geo/addresses/${id}`, address);
		return res.data;
	}

	static async delete(id: string) {
		await Axios.delete(`/geo/addresses/${id}`);
	}
}
