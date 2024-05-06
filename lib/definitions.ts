export type ProductType = {
	id: number,
	name:string,
	price:number,
	category:string,
	desc:string,
	image:string
}


export type CartProductType = {
	name: string;
	image: string;
	price: number;
	id: number;
	seller?: string;
	quantity?: number | 0;
	category?:string;
	desc?:string;
	onClick?: () => void;
};


export type ImageType = {
	id: number;
	name: string;
	image: string;
	onClick?: () => void;
}

