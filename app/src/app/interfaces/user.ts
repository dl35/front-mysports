
export interface UserRole {
    ADMIN: 'ADMIN',
    USER: 'USER'
}



export interface User {

    id?: number;
    nom: string;
    prenom: string;
    email: string;
    passwd: string;
    adresse: string;
    ville: string;
    cp: string;
    role?: UserRole;

}
