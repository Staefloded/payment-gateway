import React from 'react';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useSelector } from 'react-redux';

function Loader() {
	const { global: loading } = useSelector((state) => state.Loader);

	let color = '#7655DA';
	const override = css`
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`;

	return (
		<>
			{loading && (
				<BeatLoader color={color} loading={loading} css={override} size={25} />
			)}
		</>
	);
}

export default Loader;
