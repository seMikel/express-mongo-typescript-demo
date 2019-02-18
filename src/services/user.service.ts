import { UserModel } from '../models/user.model';
import { UserParams } from '../interfaces/user-params.interface';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../interfaces/user.interface';
import { Document } from 'mongoose';

export async function createNewUser(params: UserParams): Promise<string> {
    if (await UserModel.findOne({ name: params.name })) {
        throw new Error('Username "' + params.name + '" is already taken');
    }

    const user = new UserModel(params);
    user.hashedPass = hashSync(params.password, 10);
    return user.save().then(newUser => sign({ uid: newUser.id }, config.secret));
}

export async function authenticateUser({ name, password }): Promise<string> {
    const user = await UserModel.findOne({ name });
    if (user && compareSync(password, user.hashedPass)) {
        return sign({ uid: user.id }, config.secret);
    }
}

export async function getUserData(uid: string): Promise<User & Document> {
    return UserModel
        .findById(uid)
        .select('-_id -__v -hashedPass')
        .populate('purchases.product')
        .exec()
}

export async function setUserPurchases(uid: string, purchases: [{ product: string, amount: number }]): Promise<User & Document> {
    return UserModel
        .updateOne({ _id: uid }, { purchases })
        .exec()
        .then((e) => getUserData(uid));
}