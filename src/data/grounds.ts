import { Ground, PricePeriod } from "@/types/business.interface";

export const GROUNDS: Ground[] = [
	{
		id: '1',
		name: 'JK Sports 2 mars',
		description:
			'Kayn douch blma skhoun o chrajm o lmosi9a o dyask dyal lc waikiki',
		address: {
			country: 'Morocco',
			city: 'Casablanca',
			neighborhood: '2 mars',
			street: '2 mars rue 33 n 44',
			zip: '10000',
			geoLocation: {
				lat: 12.3456,
				lng: 78.9012,
			},
		},
		images: [
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
		],
		prices: [
			{
				amount: 1000,
				period: PricePeriod.MONTH,
				discount: 0,
				isDefault: true,
			},
			{
				amount: 2000,
				period: PricePeriod.MONTH,
				discount: 20,
				isDefault: false,
			},
		],
		rating: 4,
		reviews: 32,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'John Doe',
		updatedBy: null,
		deletedBy: null,
	},
	{
		id: '2',
		name: 'JK Sports Bélvedère',
		description:
			"L'makn lmla7 o titiz 24h/24 7j/7 o makaynch bouzbal mrhba akhi",
		address: {
			country: 'Morocco',
			city: 'Casablanca',
			neighborhood: 'Bélvedère',
			street: 'Bélvedère avenue des jardins n 12',
			zip: '20000',
			geoLocation: {
				lat: 23.4567,
				lng: 89.0123,
			},
		},
		images: [
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
		],
		prices: [
			{
				amount: 2000,
				period: PricePeriod.MONTH,
				discount: 20,
				isDefault: true,
			},
			{
				amount: 3000,
				period: PricePeriod.MONTH,
				discount: 30,
				isDefault: false,
			},
		],
		rating: 5,
		reviews: 16,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'Jane Smith',
		updatedBy: null,
		deletedBy: null,
	},
	{
		id: '3',
		name: 'JK Sports Beauséjour',
		description:
			'Kitrini 3ndna Habbat o Souhail o Sabiri o Chro9at o Lwa7cha o Mo3tamid',
		address: {
			country: 'Morocco',
			city: 'Casablanca',
			neighborhood: 'Beauséjour',
			street: 'Beauséjour boulevard des étoiles n 123',
			zip: '30000',
			geoLocation: {
				lat: 34.5678,
				lng: 90.1234,
			},
		},
		images: [
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
		],
		prices: [
			{
				amount: 3000,
				period: PricePeriod.MONTH,
				discount: 30,
				isDefault: true,
			},
			{
				amount: 4000,
				period: PricePeriod.MONTH,
				discount: 40,
				isDefault: false,
			},
		],
		rating: 3,
		reviews: 54,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'Oussama Khalfi',
		updatedBy: null,
		deletedBy: null,
	},
	{
		id: '4',
		name: 'JK Sports 2 mars',
		description: 'Kayn douch blma skhoun o chrajm o lmosi9a dyal lc waikiki',
		address: {
			country: 'Morocco',
			city: 'Casablanca',
			neighborhood: '2 mars',
			street: '2 mars rue 33 n 44',
			zip: '10000',
			geoLocation: {
				lat: 12.3456,
				lng: 78.9012,
			},
		},
		images: [
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
		],
		prices: [
			{
				amount: 1000,
				period: PricePeriod.MONTH,
				discount: 0,
				isDefault: true,
			},
			{
				amount: 2000,
				period: PricePeriod.MONTH,
				discount: 20,
				isDefault: false,
			},
		],
		rating: 5,
		reviews: 79,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'John Doe',
		updatedBy: null,
		deletedBy: null,
	},
	{
		id: '5',
		name: 'JK Sports Bélvedère',
		description:
			"L'makn lmla7 o titiz 24h/24 7j/7 o makaynch bouzbal mrhba akhi",
		address: {
			country: 'Morocco',
			city: 'Casablanca',
			neighborhood: 'Bélvedère',
			street: 'Bélvedère avenue des jardins n 12',
			zip: '20000',
			geoLocation: {
				lat: 23.4567,
				lng: 89.0123,
			},
		},
		images: [
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
		],
		prices: [
			{
				amount: 1000,
				period: PricePeriod.MONTH,
				discount: 0,
				isDefault: true,
			},
			{
				amount: 2000,
				period: PricePeriod.MONTH,
				discount: 20,
				isDefault: false,
			},
		],
		rating: 4,
		reviews: 10,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'Jane Smith',
		updatedBy: null,
		deletedBy: null,
	},
	{
		id: '6',
		name: 'JK Sports Beauséjour',
		description:
			'Kitrini 3ndna Habbat o Souhail o Sabiri o Chro9at o Lwa7cha o Mo3tamid',
		address: {
			country: 'Morocco',
			city: 'Casablanca',
			neighborhood: 'Beauséjour',
			street: 'Beauséjour boulevard des étoiles n 123',
			zip: '30000',
			geoLocation: {
				lat: 34.5678,
				lng: 90.1234,
			},
		},
		images: [
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
		],
		prices: [
			{
				amount: 1000,
				period: PricePeriod.MONTH,
				discount: 0,
				isDefault: true,
			},
			{
				amount: 2000,
				period: PricePeriod.MONTH,
				discount: 20,
				isDefault: false,
			},
		],
		rating: 3,
		reviews: 33,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'Oussama Khalfi',
		updatedBy: null,
		deletedBy: null,
	},
];