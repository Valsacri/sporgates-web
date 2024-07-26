import { Address, Record, Socials } from "./general.interface";

export interface Page extends Record {
	name: string;
	description: string;
	avatar: string;
	cover: string;
	bio: string;
	address: string | Address;
	phoneNumber: string;
	email: string;
	website: string;
	socials: Socials;
}