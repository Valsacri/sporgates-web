'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertContext } from '@/client/contexts/alert.context';
import { Input } from '../utils/form/Input';
import Button from '../utils/Button';
import Rating from './Rating';
import { Review, ReviewTopicType } from '@/types/review.types';
import { ReviewClientService } from '@/client/services/geo/review.client-service';
import { CreateReviewDto, CreateReviewDtoType } from '@/dtos/review.dto';

interface Props {
	review?: Review;
	onSubmit?: () => any;
	topicType: ReviewTopicType;
	topic: string;
	onClose?: () => any;
}

function ReviewForm({ review, onSubmit, topicType, topic, onClose }: Props) {
	const showAlert = useContext(AlertContext);

	const { register, handleSubmit, formState, watch, setValue } = useForm({
		defaultValues: {
			rating: review?.rating,
			comment: review?.comment,
			topicType,
			topic,
		} as CreateReviewDtoType,
		resolver: zodResolver(CreateReviewDto),
	});

	const rating = watch('rating');

	const handleReviewSubmit = async (data: CreateReviewDtoType) => {
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
			onClose?.();
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	return (
		<div className='space-y-3'>
			<form
				onSubmit={handleSubmit(handleReviewSubmit)}
				className='grid grid-cols-1 lg:grid-cols-2 gap-3'
			>
				<Rating
					value={rating}
					onChange={(rating) => setValue('rating', rating)}
					className='text-xl'
				/>
				<Input
					{...register('comment')}
					// label='Comment'
					placeholder='Leave a comment'
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
	);
}

export default ReviewForm;
