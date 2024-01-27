import {SignUpData} from "../repositories/userRepository";
import * as userRepository from '../repositories/userRepository';
import * as errorUtils from "../utils/errorUtils";

export async function createUser(newUser: SignUpData) {
    const {email, password} = newUser;

    const isEmailTaken = await userRepository.findUserByEmail(email);
    if (isEmailTaken) {
        throw errorUtils.conflictError('Invalid user information');
    }

}