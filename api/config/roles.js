const roles = ["developer", "manager", "agentPart"];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'customerInvoice']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'selfInvoice']);
roleRights.set(roles[2], ['getUsers', 'manageUsers', 'employInvoice']);
roleRights.set(roles[3], ['getUsers', 'manageUsers', 'allInvoice']);
roleRights.set(roles[4], ['getUsers', 'manageUsers', 'allInvoice']);
roleRights.set(roles[5], ['getUsers', 'manageUsers', 'allInvoice']);

module.exports = {
  roles,
  roleRights,
};
