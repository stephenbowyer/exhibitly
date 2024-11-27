import axios, {AxiosResponse, AxiosError} from 'axios'

export const museumList = [
    'chicago', 'cleveland'
];

const museums = {
    'chicago': {
        name: 'Art Institute Of Chicago',
        api: axios.create({baseURL: 'https://api.artic.edu/api/v1/'}),
        searchEndpoint: '/artworks/search',
        itemEndpoint: '/artworks/',
        imageField: 'image_id',
        yearField: 'date_display',
        descriptionField: 'short_description',
        getDescription: (item:Object) => {
            var description = '';
            if (item['date_display'])
                description += item['date_display'];
            if (item['date_display'] && item['short_description'] && item['date_display'].length > 0 && item['short_description'].length > 0)
                description += ': ';
            if (item['short_description'])
                description += item['description'].replace(/<[^>]*>?/gm, '');
            return description;
        },
        getImageURL: (item:Object) => {
            if (item.image_id) return `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
        },
        getLowImageURL: (item:Object) => {
            if (item.image_id) return `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
        },
        artistField: 'artist_title',
        getArtistName: (item:Object) => item.artist_title,
        getOldDetails: (item:Object) => {return fetchItem('chicago', item.image_id)},
        getDetails: (museum:Object, allItems:Array<ItemsArray>) => {
            const promises = new Array();
            allItems.forEach((item) => promises.push(fetchItem('chicago', item['id'])));
            return Promise.all(promises);
        }
    },
    'cleveland': {
        name: 'The Cleveland Museum of Art',
        api: axios.create({baseURL: 'https://openaccess-api.clevelandart.org/api'}),
        searchEndpoint: '/artworks',
        itemEndpoint: '/artworks/',
        imageField: 'images',
        yearField: 'date_text',
        descriptionField: 'description',
        getDescription: (item:Object) => {
            var description = '';
            if (item['date_text'])
                description += item['date_text'];
            if (item['date_text'] && item['description'] && item['date_text'].length > 0 && item['description'].length > 0)
                description += ': ';
            if (item['description'])
                description += item['description'];
            return description;
        },
        getImageURL: (item:Object) => {
            if (item.images.print) return item.images.print.url;
            if (item.images.web) return item.images.web.url;
        },
        getLowImageURL: (item:Object) => {
            if (item.images.web) return item.images.web.url;
            if (item.images.print) return item.images.print.url;
        },
        artistField: 'creators',
        getArtistName: (item:Object) => item.creators[0]?.description.split(" (")[0],
    },
};

const setDetails = (museumName:string, item:ItemsArray, lowResImages = false) => {
    const museum = museums[museumName];
    item['museum'] = museumName;
    item['museumTitle'] = museum.name;
    item['itemDescription'] = museum.getDescription(item);
    if (item[museum.imageField]){
        if (lowResImages)
            item['imageURL'] = museum.getLowImageURL(item);
        else
            item['imageURL'] = museum.getImageURL(item);
    }
    if (item[museum.artistField])
        item['artistName'] = museum.getArtistName(item);
    return item;
}

export interface ItemsArray {
    id: string;
	title: string;
	author: string;
	artist_title: string;
    image_id: string;
    imageURL: string;
    artistName: string;
    museum: string;
    museumTitle: string;
}

interface ItemsResponse {
    pagination: Object;
    data: Array<ItemsArray>;
    info: Object;
    config: Object;
}

export const fetchAllItems = (start:number = 0, searchQuery:string = '') => {
    const promises = new Array();
    museumList.forEach((museumName) => {
        promises.push(fetchItems(museumName, start, searchQuery));
    });
    return Promise.all(promises);
}

export const fetchItems = (museumName:string = museumList[0], start:number = 0, searchQuery:string = '') => {
    const museum = museums[museumName];
    const queryParams = {params: {has_image: 1, limit: 12, skip: start, page: Math.floor(start/10)}, fields: `id, title, ${museum.imageField}, ${museum.artistField}, ${museum.yearField}, ${museum.descriptionField}`};
    if (searchQuery.length > 0)
        queryParams.params['q'] = searchQuery;
    return museum.api.get(museum['searchEndpoint'], queryParams)
        .then((response: AxiosResponse):ItemsArray => {
            if ("getDetails" in museum){
                return museum['getDetails'](museum, response.data.data);
            }
            else
            {
                response.data.data.forEach((item:ItemsArray) => setDetails(museumName, item, true));
                return response.data.data.filter(item => item.imageURL);
            }
        }
    );
}

export const fetchItem = (museumName:string = museumList[0], itemId: String) => {
    const museum = museums[museumName];
    return museum.api.get(`${museum['itemEndpoint']}${itemId}`)
        .then((response: AxiosResponse): ItemsArray => {
            const newItem = setDetails(museumName, response.data.data, false);
            return newItem;
        }
    );
}

export const shuffleItems = (items:ItemsArray) => {
    let currentIndex = items.length;
    while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [items[currentIndex], items[randomIndex]] = [
        items[randomIndex], items[currentIndex]];
    }
}
