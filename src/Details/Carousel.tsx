import { useState } from 'react';

const Carousel = ({ images }: { images: string[] }) => {
	const [active, setActive] = useState(0);
	if (!images) images = ['http://pets-images.dev-apis.com/oets/none.jpg'];

	return (
		<div className='carousel'>
			<img src={images[active]} alt='hero' />
			<div className='carousel-smaller'>
				{images.map((photo, i) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
					<img
						key={i}
						src={photo}
						alt='thumbnail'
						className={i === active ? 'active' : ''}
						data-index={i}
						onClick={(e) =>
							setActive(Number((e.target as HTMLImageElement).dataset.index))
						}
					/>
				))}
			</div>
		</div>
	);
};

export default Carousel;
