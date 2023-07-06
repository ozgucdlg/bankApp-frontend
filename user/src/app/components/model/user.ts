
export interface User{
    id:number,
    name:string,
    username:string,
    email:string,
    addres:{
        street:string,
        suite:string,
        city:string,
        zipCode:string,
        geo:{
            lat:string,
            lng:string,
        }
        phone:string,
        website:string,
        compnany:{
            name:string,
            catchPhrase:string,
            bs:string
        }
    }

}