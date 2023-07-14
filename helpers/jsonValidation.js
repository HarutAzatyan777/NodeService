module.exports = (jsonData) => {
  // Define the validation rules
  const validationRules = {
    firstName: [
      { rule: 'required', message: 'First Name is required.' },
      { rule: 'type', type: 'string', message: 'First Name must be a string.' },
      { rule: 'regex', regex: '^[a-zA-Z]+$', message: 'First Name cannot contain numbers.' }
    ],
    lastName: [
      { rule: 'required', message: 'Last Name is required.' },
      { rule: 'type', type: 'string', message: 'Last Name must be a string.' },
      { rule: 'regex', regex: '^[a-zA-Z]+$', message: 'Last Name cannot contain numbers.' }
    ],
    middleName: [
      { rule: 'required', message: 'Middle Name is required.' },
      { rule: 'type', type: 'string', message: 'Middle Name must be a string.' },
      { rule: 'regex', regex: '^[a-zA-Z]+$', message: 'Middle Name cannot contain numbers.' }
    ],
    birthCountry: [
      { rule: 'required', message: 'Birth Country is required.' },
      { rule: 'type', type: 'string', message: 'Birth Country must be a string.' }
    ],
    birthDate: [
      { rule: 'required', message: 'Birth Date is required.' },
      { rule: 'type', type: 'string', message: 'Birth Date must be a string.' }
    ],
    citizenship: [
      { rule: 'required', message: 'Citizenship is required.' },
      { rule: 'type', type: 'string', message: 'Citizenship must be a string.' }
    ],
    passportSerialNumber: [
      { rule: 'required', message: 'Passport Serial Number is required.' },
      { rule: 'type', type: 'string', message: 'Passport Serial Number must be a string.' },
      { rule: 'regex', regex: '^[A-Z][0-9]{8}$', message: 'Invalid Passport Serial Number.' }
    ],
    passportIssueDate: [
      { rule: 'required', message: 'Passport Issue Date is required.' },
      { rule: 'type', type: 'string', message: 'Passport Issue Date must be a string.' }
    ],
    passportIssuingAuthority: [
      { rule: 'required', message: 'Passport Issuing Authority is required.' },
      { rule: 'type', type: 'string', message: 'Passport Issuing Authority must be a string.' }
    ],
    nationality: [
      { rule: 'required', message: 'Nationality is required.' },
      { rule: 'type', type: 'string', message: 'Nationality must be a string.' }
    ],
    actualAddress: [
      { rule: 'type', type: 'string', message: 'Actual Address must be a string.' }
    ],
    residenceCity: [
      { rule: 'required', message: 'Residence City is required.' },
      { rule: 'type', type: 'string', message: 'Residence City must be a string.' }
    ],
    address: [
      { rule: 'required', message: 'Address is required.' },
      { rule: 'type', type: 'string', message: 'Address must be a string.' }
    ],
    proofOfNationality: [
      { rule: 'required', message: 'Proof of Nationality is required.' },
      { rule: 'type', type: 'string', message: 'Proof of Nationality must be a string.' }
    ],
    passportTranslation: [
      { rule: 'required', message: 'Passport Translation is required.' },
      { rule: 'type', type: 'string', message: 'Passport Translation must be a string.' }
    ],
    photos_35x45: [
      { rule: 'required', message: 'Photos 35x45 is required.' },
      { rule: 'type', type: 'string', message: 'Photos 35x45 must be a string.' }
    ],
    healthCertificate: [
      { rule: 'required', message: 'Health Certificate is required.' },
      { rule: 'type', type: 'string', message: 'Health Certificate must be a string.' }
    ],
    appearanceDate: [
      { rule: 'required', message: 'Appearance Date is required.' },
      { rule: 'type', type: 'string', message: 'Appearance Date must be a string.' }
    ]
  

    
  
  }

  // Validate the jsonData
  const validateJsonData = (data) => {
    const errors = [];
  
    for (const key in validationRules) {
      const value = data[key];
      const rules = validationRules[key];
  
      if (rules) {
        for (const rule of rules) {
          if (rule.rule === 'required' && !value) {
            errors.push(rule.message);
          } else if (rule.rule === 'type' && typeof value !== rule.type) {
            errors.push(rule.message);
          } else if (rule.rule === 'regex' && !new RegExp(rule.regex).test(value)) {
            errors.push(rule.message);
          }
        }
      } else {
        errors.push(`No validation rules found for key: ${key}`);
      }
    }
    
    return errors;
  };
  
  const validationErrors = validateJsonData(jsonData);
  if (validationErrors.length > 0) {
    console.log('Validation errors:', validationErrors);
    return false;
  } else {
    console.log('jsonData is valid.');
    return true;
  }
  
}