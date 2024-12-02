import BusinessSettingsNavigation from '@/components/settings/BusinessSettingsNavigation';

interface Props {
	children: React.ReactNode;
}

export default function Settings({ children }: Props) {
	return (
		<div className='flex gap-3'>
			<div className='hidden lg:block w-1/5'>
				<BusinessSettingsNavigation />
			</div>

			<div className='w-full lg:w-4/5'>{children}</div>
		</div>
	);
}
