import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// returns the same div on every re-render
const Modal = ({ children }: { children: React.ReactNode }) => {
	const elRef = useRef<HTMLDivElement | null>(null);
	if (!elRef.current) {
		elRef.current = document.createElement('div');
	}

	useEffect(() => {
		const modalRoot = document.getElementById('modal');
		modalRoot?.appendChild(elRef.current as HTMLDivElement);

		// remove modal from view after component unmounts
		return () => { // wrap in {} so that cleanup function returns void
			modalRoot?.removeChild(elRef.current as HTMLDivElement);
		};
	}, []);

	return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
