import axios, {AxiosResponse, AxiosError} from 'axios'

const chicagoApi = axios.create({
    baseURL: 'https://api.artic.edu/api/v1'
})

export interface ItemsArray {
    id: string;
	title: string;
	author: string;
	artist_title: string;
    image_id: string;
}

interface ItemsResponse {
    pagination: Object;
    data: Array<ItemsArray>;
    info: Object;
    config: Object;
}

export const fetchItems = () => {
    const queryParams = {params: {limit: 9}, fields: 'id, title, artist_title, image_id'};
    return chicagoApi.get('/artworks', queryParams)
        .then((response: AxiosResponse): ItemsResponse => {
            return response.data;
            //            return response.data.data.filter(item => item.image_id != null);

        });
}

export const fetchItem = (itemId: String) => {
    return chicagoApi.get(`/artworks/${itemId}`)
        .then((response: AxiosResponse): ItemsResponse => {
//            console.log(response.data);
            return response.data;
        })
}
