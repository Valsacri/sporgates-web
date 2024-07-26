import { Record } from "./general.interface";

export interface SportCategory {
	name: string;
	imageUrl: string;
}

export interface Sport extends Record {
	category: string | SportCategory;
	name: string;
	icon: string;
	imageUrl: string;
}
