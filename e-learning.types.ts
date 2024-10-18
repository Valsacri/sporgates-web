type Ref<T> = string | T;

type Gender = 'male' | 'female';
type Role = 'administrator' | 'male' | 'female';

interface User {
	name: string;
	email: string;
	registrationDate: Date;
	gender: Gender;
	role: Role;
}

interface Subscription {
	name: string;
	description: string;

	payment: Ref<Payment>;
}

interface Payment {
	name: string;
	amount: number;

	student: Ref<Student>;
	Subscription: Ref<Student>;
}

interface UserSubscription {
	expirationDate: Date;

	user: Ref<User>;
	subscription: Ref<Subscription>;
}

interface Language {
	name: string;
}

interface Course {
	name: string;
	description: string;

	language: Ref<Language>;
	level: Ref<Level>;
}

interface Level {
	name: string;

	course: Ref<Course>;
}

interface Book {
	name: string;
	url: string;
}

interface LevelBook {
	book: Ref<Book>;
	level: Ref<Level>;
}

interface Classroom {
	name: string;
	meetUrl: string;

	level: Ref<Level>;
	teacher: Ref<Teacher>;
}

interface ClassroomSchedule {
	day: string;
	startTime: string;
	endTime: string;

	classroom: Ref<Classroom>;
}

interface StudentClassroom {
	student: Ref<Student>;
	classroom: Ref<Classroom>;
}

interface Lesson {
	subject: string;

	classroom: Ref<Classroom>;
}

interface Teacher extends User {
	available: boolean;
}

interface TeacherLanguage extends User {
	teacher: Ref<Teacher>;
	language: Ref<Language>;
}

interface Student extends User {
	isSubscribed: boolean;
	lastSubscriptionEndDate: Date;
}
