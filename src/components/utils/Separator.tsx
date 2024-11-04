import { twMerge } from 'tailwind-merge';

interface Props {
	className?: string;
}

function Separator({ className }: Props) {
	return <hr className={twMerge('border-secondary my-1', className)} />;
}

export default Separator;
