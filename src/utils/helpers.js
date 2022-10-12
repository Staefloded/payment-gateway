import EnvDev from '../env.dev';
import EnvProd from '../env.prod';
import moment from 'moment';
import { EventHandler } from './EventHandler';
import { groupBy } from 'lodash';
import CryptoJS from 'crypto-js';
import { formatMoney } from './FormatMoney';
import store from '../redux/store';

export { formatMoney };

export const fakeAuth = {
	isAuthenticated: false,
	authenticate(callback) {
		this.isAuthenticated = true;
		setTimeout(callback, 200);
	},
	signOut(callback) {
		this.isAuthenticated = false;
		setTimeout(callback, 200);
	},
};

export const getAllModels = () => {
	return store.getState();
};

export const getSingleModel = (model) => {
	const currentState = store.getState();
	return currentState[model];
};

export const reduxDispatch = () => store.dispatch;

export const changeInput = (This) => (key, value, root) => {
	let data = { [key]: value };
	if (root) {
		data = { [root]: { ...This.state[root], ...data } };
	}
	This.setState(data);
};

export const amount = (debitAmt, credAmt, currency = '₦') => {
	return +debitAmt
		? `${formatMoney(+debitAmt, currency)}`
		: `${formatMoney(+credAmt, currency)}`;
};

export const getModelKeys = (model) =>
	Object.keys(model?.effects({})).map((a) => `${model.name}/${a}`);

export const queryParams = (q) =>
	Object.entries(q)
		.map(([k, v]) => `${k}=${v}`)
		.join('&');

export const maskDetail = (accNo) => {
	if (!accNo) {
		return accNo || '**** **** **** ****';
	}
	const accountLength = accNo.length;
	return (
		accNo.substring(0, 2) +
		accNo.substring(2, accountLength - 2).replace(/[a-zA-z0-9]/g, '*') +
		accNo.substring(accountLength - 2)
	);
};

export const formatAmount = (value) =>
	Number(value)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const validAmount = (value) => {
	const validRegexp = /^[1-9][0-9]*(?:[.]\d{0,2})?$/;
	return validRegexp.test(value);
};

export const limitLength = (string = '', maxLength) =>
	string.substr(0, maxLength);

export const arrayMove = (arr, from, to) => {
	arr.splice(to, 0, arr.splice(from, 1)[0]);
	return arr;
};

export const formatCard = (pan) => {
	if (!pan || pan.length < 4) {
		return pan;
	}
	pan = getCardNumber(pan);
	const cardFormats = [
		[4, 8, 12, 16],
		[3, 7, 11, 15],
	];
	const format = pan.length % 2 === 0 ? cardFormats[0] : cardFormats[1];
	return pan
		.split('')
		.reduce(
			(cur, next, index) => (cur += format.includes(index) ? '-' + next : next)
		);
};

export const getCardNumber = (pan) => pan.replace(/-/g, '');

export const generateFileName = (type = 'image/jpg') =>
	`${new Date().getTime()}.${type.split('/')[1]}`;

export const ENV = process.env.NODE_ENV === 'development' ? EnvDev : EnvProd; // Environment Management

export const isDebit = (debitAmt) => !!+debitAmt;

export const narration = (str) =>
	str.length > 23 ? str.substring(0, 23) + '...' : str;

export const dateTime = (value, format = 'DD MMM, YYYY, HH:mm:ss') =>
	value ? moment(String(value)).format(format) : value;

export const date = (value, format = 'DD MMM, YYYY') =>
	value ? moment(String(value)).format(format) : value;

export const time = (value, A = 'HH:mm') =>
	value ? moment(String(value)).format(A) : value;

export const capitalize = (str) =>
	!str
		? 'GTB'
		: str
				.split(/[\s|,_]/)
				.map((a) =>
					a.length > 1 ? a[0].toUpperCase() + a.substring(1).toLowerCase() : a
				)
				.join(' ');
export const deepCopy = (val) => JSON.parse(JSON.stringify(val));

export const evaluate = (str) => {
	try {
		// eslint-disable-next-line no-new-func
		return Function(`'use strict'; return (${str})`)() || 0;
	} catch (e) {
		return 0;
	}
};

export const calOperator =
	(This) =>
	(val, isDecimalFormat = false) => {
		const { type, maxLength } = This.props;
		let { content } = This.state;
		if (type === 'TEXT') {
			if (val === 'del') {
				content = content.substring(0, content.length - 1);
			} else {
				content += String(val);
			}
			content = maxLength ? content.substring(0, maxLength) : content;
			This.setState({ content });
			return;
		}
		content = String(content === '0' ? '' : content);
		const oper = ['×', '÷', '%', '.'];
		if (!content && [...oper, '0'].includes(val)) {
			return;
		}
		if (val === 'AC') {
			return This.setState({ result: '0', content: '0' });
		}
		if (val === '=') {
			const result = Math.abs(
				evaluate(content.replace(/[÷]/g, '/').replace(/[×]/g, '*'))
			);
			This.setState({ result: formatAmount(result) });
			return;
		}
		if (val === 'del') {
			content = !['×', '÷', '%', '-', '+'].some((op) => content.includes(op))
				? String(parseFloat(content, 10))
				: content;
			if (content === '0' || content === 'NaN') {
				return;
			}
			content = content.substring(0, content.length - 1);
			content = !content ? '0' : content || '0';
		} else {
			const lastVal = content[content.length - 1];
			if (
				[...oper, '-', '+'].includes(lastVal) &&
				[...oper, '-', '+'].includes(val) &&
				(lastVal === val || ['×', '÷'].includes(val))
			) {
				return;
			}
			if (content.includes('.') && !isDecimalFormat) {
				const pos = content.lastIndexOf('.');
				const v = content.substring(pos + 1);
				if (v.length === 2 && !['×', '÷', '%', '-', '+'].includes(val)) {
					return;
				}
			}
			content += val;
		}
		if (isDecimalFormat) {
			if (content.includes('.')) {
				content = content.replace(/[.]/g, '');
				console.log('content1=', content);
			}
			const len = content.length;
			content =
				content.substring(0, len - 2) + '.' + content.substring(len - 2);
		}
		console.log('content2=', content);
		content = maxLength ? content.substring(0, maxLength) : content;
		This.setState({ content });
	};

export const group = (payloads = [], field, maxSubstrLen = 1, type = null) => {
	if (payloads && !payloads.length) {
		return [];
	}
	const getFromNow = (k, len) => {
		let pos = k.indexOf(' ');
		pos = pos === -1 ? len : pos;
		const newDate = new Date(k.substring(0, pos) || undefined);
		let fromNow = moment(newDate, 'YYYYMMDD').fromNow();
		console.log('k=', k, 'pos=', pos, 'fromNow=', fromNow);
		fromNow = fromNow.toLowerCase().includes('hour') ? 'Today' : fromNow;
		return capitalize(fromNow);
	};

	return Object.entries(
		groupBy(payloads, (a) => a[field].substr(0, maxSubstrLen))
	).map(([k, v]) => ({
		title: type === 'DATE' ? getFromNow(k, maxSubstrLen) : k,
		data: v,
	}));
};

export const sleep = async (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const mapCardsAndAccounts = (cards, accounts) => {
	accounts = accounts.map((a) => {
		const updatedAcc = {
			cards: cards.filter((c) => a.nubanNumber === c.nuban) || [],
			...a,
		};
		cards = cards.map((c) =>
			a.nubanNumber === c.nuban ? { acc: a, ...c } : c
		);
		return updatedAcc;
	});
	return { updatedCards: cards, updatedAccounts: accounts };
};

export const mergeCardsWithStatuses = (cards, cardStatuses) => {
	cards = cards.map((c) => {
		const panEn = c.panEncrypt.split('(');
		c.pan = panEn && panEn.length ? panEn[0] : c.panEn;
		return c;
	});
	return cards.map((c) => {
		const result = cardStatuses.filter((cs) => cs.pan === c.pan);
		return result.length ? { ...result[0], ...c } : c;
	});
};

export const getBranch = (branches, code) => {
	const branch = branches.filter((b) => b.code === code);
	return branch && branch.length
		? branch[0]
		: { name: 'GTB', code: '011', address: '' };
};

export const cardExpiry = (text) =>
	text.substring(0, 2) + '/' + text.substring(2);

export const detectCardType = (number, type = null) => {
	if (type) {
		const r = ['master', 'verve', 'visa'].filter((t) =>
			type.toLowerCase().includes(t)
		);
		if (r.length) {
			return r[0];
		}
	}
	const re = {
		electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
		maestro:
			/^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
		dankort: /^(5019)\d+$/,
		interPayment: /^(636)\d+$/,
		unionPay: /^(62|88)\d+$/,
		visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
		master: /^5[1-5][0-9]{14}$/,
		amex: /^3[47][0-9]{13}$/,
		diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
		discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
		jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
	};
	for (const key in re) {
		if (re[key].test(number)) {
			return key;
		}
	}
	return 'verve';
};

export { EventHandler };

export const random = (startIndex = 1, maxIndex = 100) =>
	Math.round(Math.random() * maxIndex + startIndex);

export const addTagging = (e, This) => {
	const { tagLine } = This.state;
	const { key } = e.nativeEvent;
	console.log('Key=', key);
	if (tagLine.length > 40) {
		return;
	}
	if ((key && key.includes(',')) || key === ' ') {
		console.log('Key2=', key);
		const tagValues = tagLine
			.split(/,|\s/)
			.map((a) => (a.includes('#') ? a : `#${a}`))
			.filter((a) => a !== '#');
		console.log('tagValues=', tagValues);
		setTimeout(
			() =>
				This.setState({
					tags: tagValues,
					tagLine: tagValues.join(' ') + ' ',
				}),
			220
		);
	}
};

export const isOauthTokenAboutToExpire = (oauthModel) => {
	if (!oauthModel?.access_token) {
		return false;
	}
	let twelveHoursBefore = 43200;
	let expiry = moment(oauthModel?.lastTokenGenerationTime).add(
		oauthModel?.expires_in - twelveHoursBefore, //oauthModel?.expires_in
		'seconds'
	);
	const isExpired = moment().isAfter(expiry);
	return isExpired;
};
export const base64 = (string) => {
	const b64 =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	// const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

	string = String(string);
	let bitmap,
		a,
		b,
		c,
		result = '',
		i = 0,
		rest = string.length % 3; // To determine the final padding

	for (; i < string.length; ) {
		if (
			(a = string.charCodeAt(i++)) > 255 ||
			(b = string.charCodeAt(i++)) > 255 ||
			(c = string.charCodeAt(i++)) > 255
		) {
			throw new TypeError(
				"Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
			);
		}

		bitmap = (a << 16) | (b << 8) | c;
		result +=
			b64.charAt((bitmap >> 18) & 63) +
			b64.charAt((bitmap >> 12) & 63) +
			b64.charAt((bitmap >> 6) & 63) +
			b64.charAt(bitmap & 63);
	}

	// If there's need of padding, replace the last 'A's with equal signs
	return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result;
};

export const generateSignature = async (url, data, timestamp, model, isQr) => {
	let body = typeof data === 'string' ? data : await JSON.stringify(data);
	let uri = url;
	let secret = '';
	if (isQr) {
		secret = model.QRSettings?.signatureSecret;
		uri = '/core/app/qrcode';
	} else {
		secret =
			model.Oauth?.tempFireBaseAuth?.signatureSecret ||
			model.Oauth?.fireBaseAuth?.signatureSecret ||
			'';
	}

	// console.log('model', model);
	// console.log('secret', secret);

	if (!secret) {
		return;
	}

	let req = `${uri}${body}${timestamp}`;
	let hash = await CryptoJS.HmacSHA256(req, secret);
	let hashInBase64 = await CryptoJS.enc.Base64.stringify(hash);

	return hashInBase64;
};

export const generateAuthorization = (
	deviceID,
	userID,
	model,
	isLogin,
	isQr
) => {
	if (!deviceID || !userID || isQr) {
		return;
	}
	let authSecret =
		model?.tempFireBaseAuth?.authSecret || model?.fireBaseAuth?.authSecret;
	let access_token = model?.access_token;
	let hashForAuth = 'Basic ' + base64(`${deviceID}_${userID}:${authSecret}`);
	let hashForGeneral = 'Bearer ' + access_token;
	return isLogin ? hashForAuth : hashForGeneral;
};
