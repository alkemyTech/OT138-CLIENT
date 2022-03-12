import api from '../../config/api';

export const getMembers = async () => {
    return api.get('/members').then(res => res);
}