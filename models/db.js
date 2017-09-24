
let users = [
    {username: 'hudson', password: '1', roles: [1, 2]},
    {username: 'hugo', password: '1', roles: [1]},
    {username: 'michel', password: '1', roles: [2]}
];

let roles = {1: 'admin', 2: 'user'};

exports.users = function () {
    return users;
};

exports.roles = function () {
    return roles;
};
