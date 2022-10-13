const decodeSpec = {
  ACC: 'accountNumber',
  'ALT-ACC': 'altAccountNumber',
  AM: 'amount',
  CC: 'currency',
  RF: 'reference',
  RN: 'beneficiaryName',
  DT: 'dueDate',
  PT: 'paymentType',
  MSG: 'narration',
  CRC32: 'checksum',
  BANK: 'bank',
};

const encodeSpec = {
  accountNumber: 'ACC',
  altAccountNumber: 'ALT-ACC',
  amount: 'AM',
  currency: 'CC',
  reference: 'RF',
  beneficiaryName: 'RN',
  dueDate: 'DT',
  paymentType: 'PT',
  narration: 'MSG',
  checksum: 'CRC32',
};

export const decode = (QRString) => {
  let retObj = {},
    values = QRString.split('*');

  values.forEach((element) => {
    for (const property in decodeSpec) {
      if (element.indexOf(property) !== -1) {
        retObj[decodeSpec[property]] = element.substring(
          property.length + 1,
          element.length,
        );
        return;
      }
    }
  });
  return {
    inputStr: QRString,
    decodedObj: retObj,
  };
};

export const encode = (encObject) => {
  let retString = 'SPD*1.0*';
  for (const property in encObject) {
    retString += encodeSpec[property] + ':' + encObject[property] + '*';
  }
  retString += 'BANK:CLANE*';
  return retString;
};
