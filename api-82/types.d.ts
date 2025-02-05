export interface UsersFiled{
    username: string;
    password: string;
    role: string;
    token: string;
    displayName: string;
    googleId: string;
    avatar: File | null;
}