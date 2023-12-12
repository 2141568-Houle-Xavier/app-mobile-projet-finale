import axios, { Axios, AxiosResponse } from "axios";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { IMeteo } from "../models/IMeteo";
import { useState } from "react";

const weather_api_key = "57352fb3fbe40aa493121bc7f108f592"

class ApiService {
    api: Axios;

    constructor(url) {
        this.api = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    private gererReponse<T>(response: AxiosResponse<T>) {
        if (response.status >= 400)
            throw new Error("Error Code: ");

        return response.data;
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await this.api.get(endpoint);

        return this.gererReponse(response);
    }
}

export default ApiService;