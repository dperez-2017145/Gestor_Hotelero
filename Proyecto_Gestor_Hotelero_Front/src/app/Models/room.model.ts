export class Room{
    constructor(
        public _id: string,
        public name: string,
        public type: string,
        public price: number,
        public status: boolean,
        public idHotel: string
    ){};
}