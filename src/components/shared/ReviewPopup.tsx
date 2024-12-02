'use client';

import { Popup } from '@/components/utils/Popup';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ReviewDto, ReviewDtoType } from '@/dtos/review.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertContext } from '@/client/contexts/alert.context';
import { Input } from '../utils/form/Input';
import Button from '../utils/Button';
import Rating from './Rating';
import { Review } from '@/types/general.types';
import { UserContext } from '@/client/contexts/user.context';
import { ReviewClientService } from '@/client/services/geo/review.client-service';

interface Props {
	children: React.ReactNode;
	review?: Review;
	onSubmit?: () => any;
	topic?: {
		user?: string;
		business?: string;
		club?: string;
	};
}

function ReviewFormPopup({ children, review, onSubmit, topic }: Props) {
	const [open, toggleOpen] = usePopup();
	const [user] = useContext(UserContext);

	const showAlert = useContext(AlertContext);

	const { register, handleSubmit, formState, watch, setValue } = useForm({
		defaultValues: {
			rating: review?.rating,
			comment: review?.comment,
			...topic,
			createdBy: user?.id,
		} as ReviewDtoType,
		resolver: zodResolver(ReviewDto),
	});

	const rating = watch('rating');

	const handleReviewSubmit = async (data: ReviewDtoType) => {
		try {
			if (review) {
				await ReviewClientService.update(review.id as string, data);
				showAlert({
					type: 'success',
					message: 'Review updated successfully',
				});
			} else {
				await ReviewClientService.create(data);
				showAlert({
					type: 'success',
					message: 'Review created successfully',
				});
			}
			onSubmit?.();
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			{open && (
				<Popup
					open={true}
					title={review ? 'Edit review' : 'Post a review'}
					description={
						review
							? 'Edit your the review.'
							: 'Fill in the details to post a new review.'
					}
					onClose={toggleOpen}
					className='w-full lg:w-1/2'
				>
					<div className='space-y-3'>
						<form
							onSubmit={handleSubmit(handleReviewSubmit)}
							className='grid grid-cols-1 lg:grid-cols-2 gap-3'
						>
							<Rating
								value={rating}
								onChange={(rating) => setValue('rating', rating)}
							/>
							<Input
								{...register('comment')}
								label='Comment'
								placeholder='Leave a comment'
								multiline
								className='col-span-2'
							/>

							<div className='col-span-2'>
								<Button
									type='submit'
									color='primary'
									className='min-w-full lg:min-w-48 ml-auto'
									loading={formState.isSubmitting}
								>
									Save
								</Button>
							</div>
						</form>
					</div>
				</Popup>
			)}
		</>
	);
}

export default ReviewFormPopup;
