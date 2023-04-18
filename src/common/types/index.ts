export type LayoutProps = {
    children: JSX.Element;
};

export type Ingredient = {
    name: string;
    quantity: number;
    udm: string;
};

export interface Cake {
    _id: string;
    date: string;
    name: string;
    price: number;
    ingredients: Array<Ingredient>;
    onSale: boolean;
    quantity: number;
    images: string[];
};

export interface CakeForm {
    name: string;
    price: number;
    ingredients: Array<Ingredient>;
    onSale: boolean;
    quantity: number;
    images?: string[];
    date: string;
};

export interface LoginResponse {
    success: boolean;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginModalProps {
    open: boolean;
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>
}

export interface NavBarPages {
    title: string;
    path: string;
    level: 'user' | 'admin';
}