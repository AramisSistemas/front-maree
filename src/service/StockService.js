import request from '../context/interceptor';

export class StockService {

    async GetIvas() {
        const res = await request.get('Stock/GetIvas');  
        return res.data;
    }

    async GetRubros() {
        const res = await request.get('Stock/GetRubros');  
        return res.data;
    }

    async GetUbicaciones() {
        const res = await request.get('Stock/GetUbicaciones');  
        return res.data;
    }
}