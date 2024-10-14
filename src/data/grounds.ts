import { OpeningHours } from '@/types/business.types';
import { DateTimeframes } from '@/types/general.types';
import {
	ClubSubscription,
	ClubSubscriptionPeriodDuration,
} from '@/types/item/club.types';
import { Ground } from '@/types/item/ground.types';
import { User } from '@/types/user.types';

const openingHours: OpeningHours = {
	monday: {
		start: { hours: 8, minutes: 0 },
		end: { hours: 22, minutes: 0 },
	},
	tuesday: {
		start: { hours: 8, minutes: 0 },
		end: { hours: 22, minutes: 0 },
	},
	wednesday: {
		start: { hours: 8, minutes: 0 },
		end: { hours: 22, minutes: 0 },
	},
	thursday: {
		start: { hours: 8, minutes: 0 },
		end: { hours: 22, minutes: 0 },
	},
	friday: {
		start: { hours: 8, minutes: 0 },
		end: { hours: 22, minutes: 0 },
	},
	saturday: {
		start: { hours: 8, minutes: 0 },
		end: { hours: 22, minutes: 0 },
	},
	sunday: {
		start: { hours: 8, minutes: 0 },
		end: { hours: 22, minutes: 0 },
	},
};

const subscriptions: ClubSubscription[] = [
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
		price: 1000,
		period: { duration: ClubSubscriptionPeriodDuration.MONTH, amount: 1 },
		discount: 0,
		isHighlighted: true,
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
		price: 1000,
		period: { duration: ClubSubscriptionPeriodDuration.MONTH, amount: 1 },
		discount: 0,
		isHighlighted: false,
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
		price: 2000,
		period: { duration: ClubSubscriptionPeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isHighlighted: false,
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
		price: 2000,
		period: { duration: ClubSubscriptionPeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isHighlighted: false,
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
		price: 2000,
		period: { duration: ClubSubscriptionPeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isHighlighted: false,
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
		price: 2000,
		period: { duration: ClubSubscriptionPeriodDuration.MONTH, amount: 1 },
		discount: 20,
		isHighlighted: false,
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

const busyHours: DateTimeframes[] = [
	{
		date: new Date(2024, 7, 12),
		timeframes: [
			{ start: { hours: 8, minutes: 0 }, end: { hours: 10, minutes: 0 } },
			{ start: { hours: 16, minutes: 0 }, end: { hours: 18, minutes: 0 } },
		],
	},
];

export const GROUNDS: Ground[] = [
	{
		_id: '1',
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
		subscriptions,
		openingHours,
		busyHours,
		minReservationTime: 30,
		price: 50,
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
		_id: '2',
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
		subscriptions,
		openingHours,
		busyHours,
		minReservationTime: 60,
		price: 50,
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
		_id: '3',
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
		subscriptions,
		openingHours,
		busyHours,
		minReservationTime: 30,
		price: 50,
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
		_id: '4',
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
		subscriptions,
		openingHours,
		busyHours,
		minReservationTime: 60,
		price: 50,
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
		_id: '5',
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
		subscriptions,
		openingHours,
		busyHours,
		minReservationTime: 30,
		price: 50,
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
		_id: '6',
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
		subscriptions,
		openingHours,
		busyHours,
		minReservationTime: 60,
		price: 50,
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
