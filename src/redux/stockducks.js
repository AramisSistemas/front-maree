import request from '../context/interceptor';
import { messageService } from './messagesducks'
// data inicial

const dataInicial = {
    loading: false 
}

// types
const LOADING = 'LOADING'
const STOCK_ERROR = 'STOCK_ERROR'
const STOCK_EXITO = 'STOCK_EXITO' 


// reducer
export default function stockReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case STOCK_ERROR:
            return { ...dataInicial }
        case STOCK_EXITO:
            return { ...state, loading: false} 
        default:
            return { ...state }
    }
}

// action
 

export const AltaProductoBase = (data) => async (dispatch) => {
    var form = new FormData(); 
    form.append('Codigo', data.codigo)
    form.append('Detalle', data.detalle)
    form.append('Ubicacion', data.ubicacion)
    form.append('UbicacionStr', 'ubicacion')
    form.append('Rubro', data.rubro)
    form.append('RubroStr', 'rubro')
    form.append('Costo', data.costo)
    form.append('Iva', data.iva)
    form.append('IvaDec', data.ivaDec)
    form.append('Internos', data.internos)
    form.append('Tasa', data.tasa)
    form.append('Stock', data.stock)
    form.append('Compuesto', data.compuesto)
    form.append('Precio', data.precio) 
    form.append('Tipo', data.tipo) 
    dispatch({
        type: LOADING
    })
    await request.post('Stock/AltaProductoBase', form)
        .then(function (response) {
            dispatch({
                type: STOCK_EXITO
            });
            dispatch(messageService(true, response.data));
        })
        .catch(function (error) {
            dispatch({
                type: STOCK_ERROR
            })
            dispatch(messageService(false, error.response.data.message, error.response.status));
        });
}

 
