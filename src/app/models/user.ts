import { Pet } from './pet';
import { Role } from './role';

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: Array<Role>;
    phone: string;
    address: string;
    pets: Array<Pet>;
}
