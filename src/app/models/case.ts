import { User } from './user';

export interface Case {
    id: number;
    doctor: User;
    name: string;
    description: string;
    price: string;
    createDateTime: Date;
}
