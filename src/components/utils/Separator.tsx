import { twMerge } from 'tailwind-merge';

interface Props {
	className?: string;
}

function Separator({ className }: Props) {
	return <hr className={twMerge('my-1', className)} />;
}

export default Separator;
