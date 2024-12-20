// Importing mongoose library along with Connection type from it
import mongoose, { Connection } from 'mongoose';

import { UserModel } from '../models/user.model';
import { ClubModel } from '../models/item/club.model';
import { GroundModel } from '../models/item/ground.model';
import { GroundReservationModel } from '../models/item/ground-reservation.model';
import { WalletModel } from '../models/wallet/wallet.model';
import { TransactionModel } from '../models/wallet/transaction.model';
import { CityModel } from '../models/geo/city.model';
import { TownModel } from '../models/geo/town.model';
import { SportModel } from '../models/sport.model';
import { BusinessModel } from '../models/business.model';
import { NotificationModel } from '../models/notification.model';
import { AddressModel } from '../models/geo/address.model';
import { ReviewModel } from '../models/review.model';

UserModel;
ClubModel;
GroundModel;
GroundReservationModel;
WalletModel;
TransactionModel;
AddressModel;
CityModel;
TownModel;
SportModel;
BusinessModel;
NotificationModel;
ReviewModel;

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export async function setupDbConnection() {
	// If a cached connection exists, return it
	if (cachedConnection) {
		console.log('Using cached db connection');
		return cachedConnection;
	}

	try {
		// If no cached connection exists, establish a new connection to MongoDB
		const cnx = await mongoose.connect(process.env.MONGODB_URI!);
		// Cache the connection for future use
		cachedConnection = cnx.connection;
		// Log message indicating a new MongoDB connection is established
		console.log('New mongodb connection established');
		// Return the newly established connection
		return cachedConnection;
	} catch (error) {
		// If an error occurs during connection, log the error and throw it
		console.error(error);
		throw error;
	}
}
