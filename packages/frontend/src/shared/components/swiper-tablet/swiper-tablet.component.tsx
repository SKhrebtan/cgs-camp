import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { TodoElement } from '../todo-element/todo-element.component';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Todo } from '~/types/todo.type';
import { swiperStyles, sliderStyles } from './swiper-tablet.styles';

interface MySwiperComponentProps {
	todos: Todo[];
}

export const MySwiperComponent: React.FC<MySwiperComponentProps> = ({
	todos,
}): JSX.Element => {
	return (
		<Swiper
			className={swiperStyles}
			spaceBetween={30}
			slidesPerView={2}
			centeredSlides={true}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			modules={[Navigation, Pagination, Scrollbar, A11y]}
		>
			{todos.map((todo) => (
				<SwiperSlide className={sliderStyles} key={todo.id}>
					<TodoElement todo={todo} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
