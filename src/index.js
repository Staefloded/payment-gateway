import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<App />
	</BrowserRouter>,

	// </React.StrictMode>
	document.getElementById('root')
);
