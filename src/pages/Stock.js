import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';
import { default as React, Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import PrdBaseInsert from '../components/PrdBaseInsert';
import { messageService } from '../redux/messagesducks';
import { actualizarUsuario, eliminarUser } from '../redux/usersducks';
import { StockService } from '../service/StockService';

const Stock = () => {

    const dispatch = useDispatch();
    const activo = useSelector(store => store.users.activo);
    const stockService = new StockService();

    const [loading, setloading] = useState(true);
    const [ivas, setivas] = useState([]);
    const [rubros, setrubros] = useState([]);
    const [ubicaciones, setubicaciones] = useState([]);

    
    const fetchAuxiliares = async () => {
        setloading(true);
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
        setloading(false);
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <PrdBaseInsert></PrdBaseInsert>
        </div>
    );

    useEffect(() => {
        if (activo) {
            fetchAuxiliares();
        }
    }, [activo]);
    return (
        activo ? (
            <div className="col-12">
                <div className="card">
                    <h5>Stock Base</h5>
                    <DataTable header={header}  >

                    </DataTable>

                </div>
            </div>
        ) : (<div className="card">
            <h4>Requiere Autenticación</h4>
            <div className="border-round border-1 surface-border p-4">
                <div className="flex mb-3">
                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                    <div>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                        <Skeleton height=".5rem"></Skeleton>
                    </div>
                </div>
                <Skeleton width="100%" height="150px"></Skeleton>
                <div className="flex justify-content-between mt-3">
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
        </div>)
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Stock, comparisonFn);  