import GeneralUtils from '../utils/general.utilities';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'Frank',
    middleName: 'F',
    lastName: 'Murphy',
    phone: '08030419577',
    userType: 'Admin',
    role: 'Super',
    email: 'frankmurphy@example.com',
    password: GeneralUtils.hash('123456'),
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
