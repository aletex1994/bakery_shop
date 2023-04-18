import axios, { AxiosResponse } from "axios";
import { Cake, CakeForm, LoginResponse } from "../types";

export function getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export const getCakesData = async (): Promise<Cake[]> => {
    try {
        const response = await axios({
            method: "get",
            url: "http://localhost:8000/cakes",
        });

        const cakesData: Cake[] = response.data;
        const updatedCakesData = cakesData.filter((cake) => cake.onSale && cake.quantity > 0).map((cake) => calculateCakePrice(cake));
        return updatedCakesData;
    } catch (error) {
        console.error("Error while fetching cakes data ", error);
        throw error;
    }
};

export const checkLoginStatus = async (username: string, password: string): Promise<boolean> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post("http://localhost:8000/users/login", {
            username,
            password,
        });

        // Check the status code of the response
        if (response.status === 200) {
            return true;
        } else if (response.status === 400) {
            return false;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        username = "";
        password = "";
    }
};

export const addCake = async (cakeData: CakeForm): Promise<boolean> => {
    try {
        const response = await axios.post("http://localhost:8000/cakes/add", cakeData);
        return response.status === 200 ? true : false;
    } catch (error) {
        throw new Error(`Failed to add cake: ${error}`);
    }
};

export const deleteCake = async (cakeId: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`http://localhost:8000/cakes/${cakeId}`);
        return response.status === 200 ? true : false;
    } catch (error) {
        throw new Error(`Failed to delete cake: ${error}`);
    }
};

export const updateCake = async (cakeId: string, cakeData: Cake): Promise<boolean> => {
    try {
        const response = await axios.post(`http://localhost:8000/cakes/update/${cakeId}`, cakeData);
        console.log(response);

        return response.status === 200 ? true : false;
    } catch (error) {
        throw new Error(`Failed to update cake: ${error}`);
    }
};

export const calculateCakePrice = (cake: Cake): Cake => {
    const currentDate = new Date(getCurrentDate());
    const cakeDate = new Date(cake.date);

    const elapsedDays = Math.floor((currentDate.getTime() - cakeDate.getTime()) / (1000 * 60 * 60 * 24));

    if (currentDate === cakeDate) {
        return cake;
    } else if (elapsedDays === 1) {
        cake.price = Number((cake.price * 0.8).toFixed(2));
        return cake;
    } else if (elapsedDays === 2) {
        cake.price = Number((cake.price * 0.2).toFixed(2));
        return cake;
    } else {
        cake.onSale = false;
        return cake;
    }
};








