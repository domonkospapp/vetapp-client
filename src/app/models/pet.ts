import { User } from './user';
import { Case } from './case';

export interface Pet {
    id: number;
    name: string;
    yearOfBirth: number;
    type: string;
    owner: User;
    cases: Array<Case>;
}
