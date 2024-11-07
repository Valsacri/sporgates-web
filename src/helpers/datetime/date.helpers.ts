export class DateHelper {
	static formatDate(date: Date) {
		return date.toLocaleDateString('fr-FR');
	}

	static formatTime(date: Date) {
		return date.toLocaleTimeString('fr-FR');
	}

	static format(date: Date) {
		return date.toLocaleString('fr-FR');
	}

	static parse(date?: string) {
		if (!date) {
			return new Date();
		}

		const [day, month, year] = date.split('/');
		return new Date(Number(year), Number(month) - 1, Number(day));
	}

	static toElapsedTime(date: Date) {
		const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
		let interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + ' years ago';
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + ' months ago';
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + ' days ago';
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + ' hours ago';
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + ' minutes ago';
		}
		return Math.floor(seconds) + ' seconds ago';
	}
}
