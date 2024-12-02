import { formatDocument } from '@/server/helpers/database.helper';
import { AddressModel } from '@/server/models/geo/address.model';
import { Address } from '@/types/geo.types';
import { Create, Update } from '@/types/utils.types';
import { FilterQuery } from 'mongoose';

export class AddressServerService {
	static async getOne(id: string, query: FilterQuery<Address> = {}) {
		const city = await AddressModel.findById(id)
			.populate('city')
			.populate('town');
		return formatDocument<Address>(city);
	}

	static async getByUser(userId: string) {
		const cities = await AddressModel.find({ user: userId })
			.populate('city')
			.populate('town');
		return formatDocument<Address[]>(cities);
	}

	static async getByBusiness(businessId: string) {
		const cities = await AddressModel.find({ business: businessId })
			.populate('city')
			.populate('town');
		return formatDocument<Address[]>(cities);
	}

	static async create(address: Create<Address>) {
		const city = await AddressModel.create(address);
		return formatDocument<Address>(city);
	}

	static async update(id: string, address: Update<Address>) {
		const city = await AddressModel.findByIdAndUpdate(id, address, {
			new: true,
		});
		return formatDocument<Address>(city);
	}

	static async delete(id: string) {
		await AddressModel.findByIdAndDelete(id);
	}
}
