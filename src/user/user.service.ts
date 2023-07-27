import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    getAllUsers() {
        return {msg: 'GetAll'};
    }
    getSingleUserById() {}

    createUser() {
        return {msg: 'new User'}
    }

    updateUserPassword() {}

    deleteUser() {}
}