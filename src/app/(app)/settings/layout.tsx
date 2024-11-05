import SettingsNavigation from '@/components/settings/SettingsNavigation';
import Card from '@/components/utils/Card';

interface Props {
	children: React.ReactNode;
}

export default function Settings({ children }: Props) {
	return (
		<div className='flex gap-5'>
			<div className='hidden lg:block w-1/5'>
				<SettingsNavigation />
			</div>

			<Card className='w-full lg:w-4/5'>{children}</Card>
		</div>
	);
}
