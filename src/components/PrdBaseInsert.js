import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'; 
import { useForm } from 'react-hook-form'; 
import { StockService } from '../service/StockService';
import { messageService } from '../redux/messagesducks';
import { default as React, Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';

const PrdBaseInsert = () => {

    const dispatch = useDispatch();
    const activo = useSelector(store => store.users.activo);
    const stockService = new StockService(); 
    const [display, setdisplay] = useState(false);
    const [ivas, setivas] = useState([]);
    const [rubros, setrubros] = useState([]);
    const [ubicaciones, setubicaciones] = useState([]);

    const fetchAuxiliares = async () => { 
        await stockService.GetIvas()
            .then(data => {
                setivas(data);
            }).catch((error) => dispatch(messageService(false, error.response.data.message, error.response.status)));
        await stockService.GetRubros()
            .then(data => {
                setrubros(data);
            }).catch((error) => dispatch(messageService(false, error.response.data.message, error.response.status)));
        await stockService.GetUbicaciones()
            .then(data => {
                setubicaciones(data);
            }).catch((error) => dispatch(messageService(false, error.response.data.message, error.response.status)));
    }

    useEffect(() => {
        if (activo & display) {
            fetchAuxiliares();
        }
    }, [activo,display]);

    return <>
        <Button icon="pi pi-plus" label="Nuevo Producto" onClick={() => setdisplay(true)} className="p-button-help"></Button>
        <Dialog header="Nuevo Producto" className="card p-fluid" visible={display} style={{ width: '50vw' }} modal onHide={() => setdisplay(false)}>
            <Fragment>
                <form className="field grid" onSubmit={() => console.log('alta')}>
                    <div className="formgroup-inline">

                        <Button label="Alta"></Button>
                    </div>
                </form>
            </Fragment>
        </Dialog>
    </>
}
 
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(PrdBaseInsert, comparisonFn);  