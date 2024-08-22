import { Address, Socials } from "./general.types";
import { Record } from "./utils.types";

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
