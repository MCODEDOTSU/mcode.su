interface IUser {
    id: number;
    name: string;
    contractor_id?: number | undefined;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    post_id?: number | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    repassword?: string | undefined;
    confirmed_politics?: boolean;
    confirmed_personal_data?: boolean;
    token?: string;
    role?: string;
}

export default IUser;
