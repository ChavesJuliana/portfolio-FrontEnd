import { Tipo_trabajo } from "./tipo_trabajo";

export interface Experiencia {
    id_experiencia:number;
    url_foto:string;
    descripcion:string;
    fecha_desde:Date;
    fecha_hasta:Date;
    actualmente:number;
    id_persona:number;
    tipoTrabajo: Tipo_trabajo;
    nombre:string;

}
