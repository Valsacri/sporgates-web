import {
	Ground,
	OpeningHours,
	PricePeriod,
	PricePeriodDuration,
} from '@/types/business.interface';
import { User } from '@/types/user.interface';

const openingHours: OpeningHours = {
	monday: {
		from: '08:00',
		to: '22:00',
	},
	tuesday: {
		from: '08:00',
		to: '22:00',
	},
	wednesday: {
		from: '08:00',
		to: '22:00',
	},
	thursday: {
		from: '08:00',
		to: '22:00',
	},
	friday: {
		from: '08:00',
		to: '22:00',
	},
	saturday: {
		from: '08:00',
		to: '22:00',
	},
	sunday: {
		from: '08:00',
		to: '22:00',
	},
};

const prices = [
	{
		name: 'Basic',
		description: 'Basic subscription',
		features: [
			'Featured member',
			'See profile visitors',
			'Show / Hide last seen',
			'Verified badge',
			'40 posts Posts promotion',
			'40 Pages Pages promotion',
			'60% Discount Discount',
			'96 MB Max upload size',
		],
		amount: 1000,
		period: { duration: PricePeriodDuration.MONTH, amount: 1 },
		discount: 0,
		isDefault: true,
	},
	{
		name: 'Basic',
		description: 'Basic subscription',
		features: [
			'Featured member',
			'See profile visitors',
			'Show / Hide last seen',
			'Verified badge',
			'40 posts Posts promotion',
			'40 Pages Pages promotion',
			'60% Discount Discount',
			'96 MB Max upload size',
		],
		amount: 1000,
		period: { duration: PricePeriodDuration.MONTH, amount: 1 },
		discount: 0,
		isDefault: false,
	},
	{
		name: 'Premium',
		description: 'Premium subscription',
		features: [
			'Access to all equipments',
			'Access to all classes',
			'Access to all facilities',
			'Personal trainer',
		],
		amount: 2000,
		period: { duration: PricePeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isDefault: false,
	},
	{
		name: 'Premium',
		description: 'Premium subscription',
		features: [
			'Access to all equipments',
			'Access to all classes',
			'Access to all facilities',
			'Personal trainer',
		],
		amount: 2000,
		period: { duration: PricePeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isDefault: false,
	},
	{
		name: 'Premium',
		description: 'Premium subscription',
		features: [
			'Access to all equipments',
			'Access to all classes',
			'Access to all facilities',
			'Personal trainer',
		],
		amount: 2000,
		period: { duration: PricePeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isDefault: false,
	},
	{
		name: 'Premium',
		description: 'Premium subscription',
		features: [
			'Access to all equipments',
			'Access to all classes',
			'Access to all facilities',
			'Personal trainer',
		],
		amount: 2000,
		period: { duration: PricePeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isDefault: false,
	},
];

const reviews = [
	{
		rating: 4,
		comment:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
		user: { username: 'Oussama Khalfi' } as User,
	},
	{
		rating: 4,
		comment:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
		user: { username: 'Oussama Khalfi' } as User,
	},
	{
		rating: 4,
		comment:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
		user: { username: 'Oussama Khalfi' } as User,
	},
];

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
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
		],
		prices,
		openingHours,
		minReservationTime: 30,
		avgRating: 4,
		reviews,
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
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
		],
		prices,
		openingHours,
		minReservationTime: 60,
		avgRating: 4,
		reviews,
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
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
		],
		prices,
		openingHours,
		minReservationTime: 30,
		avgRating: 4,
		reviews,
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
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
		],
		prices,
		openingHours,
		minReservationTime: 60,
		avgRating: 4,
		reviews,
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
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
			'https://doers.ma/wp-content/uploads/2022/10/Ouvrir-une-salle-de-sport-un-club-de-gym-fitness-au-Maroc.jpg',
		],
		prices,
		openingHours,
		minReservationTime: 30,
		avgRating: 4,
		reviews,
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
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
			'https://www.jagranimages.com/images/newimg/28122022/28_12_2022-dumbbell_set_with_price_23275058.jpg',
		],
		prices,
		openingHours,
		minReservationTime: 60,
		avgRating: 4,
		reviews,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'Oussama Khalfi',
		updatedBy: null,
		deletedBy: null,
	},
];
