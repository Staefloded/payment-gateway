import { Provider } from 'react-redux';
import store from './redux/store';
import Routers  from './routers';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ConnectedToast from './containers/ConnectedToast';
import ErrorBoundary from './shared/ErrorBoundary';
import Loader from 'shared/loader';
const persistor = getPersistor();

function App() {
	return (
		<Provider store={store}>
			<PersistGate
				loading={<h1 className='text-4xl'>LOADING...</h1>}
				persistor={persistor}>
				<ErrorBoundary>
					<Routers />
					<Loader />
					<ConnectedToast />
				</ErrorBoundary>
			</PersistGate>
		</Provider>
	);
}

export default App;
