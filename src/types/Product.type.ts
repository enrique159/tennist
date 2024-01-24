import { ID } from "./Id.type";
import { ProductStock } from "./ProductStock.type";

export type Product = {
  IDProducto: ID,
  IDEmpresa: ID,
  IDCatalogo: ID,
  Familia: string,
  NombreProveedorCorto: string,
  CodigoInternet: string,
  Talla: string,
  Pagina: string,
  Marca: string,
  Estilo: string,
  Color: string,
  Tallas: string,
  Costo: number,
  PM1: number,
  CodigoGenerico: string,
  Inventario?: ProductStock | null,
  Activo: boolean,
}
