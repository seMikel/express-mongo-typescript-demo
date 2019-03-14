import { UserParams } from "./user-params.interface";

export interface NewUserParams extends UserParams {
    email: string;
}
