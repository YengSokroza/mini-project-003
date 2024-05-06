export type ProductType = {
	category: {
	  name: string;
	  icon: string;
	};
	name: string;
	price: number;
	quantity: number;
	desc: string;
	image: string;
  };

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

export type ModalType = {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
  };


  export type ModalTypeWithId = {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	id: number;
  };