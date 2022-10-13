import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BillingScreens from 'screens/BillingScreens';
import Login from 'screens/Login';
import QR from 'screens/QR';
import Success from 'screens/Success';
import Transfer from 'screens/Transfer';
import TransferLoading from 'screens/TransferLoading';
import Ussd from 'screens/Ussd';
import PaymentHeader from 'shared/components/PaymentHeader';

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<BillingScreens />} />
				<Route path='/payment' element={<PaymentHeader />}>
					<Route index element={<Transfer />} />
					<Route path='ussd' element={<Ussd />} />
					<Route path='qr' element={<QR />} />
				</Route>
				<Route path='/loading' element={<TransferLoading />} />
				<Route path='/success' element={<Success />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
