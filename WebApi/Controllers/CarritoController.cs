using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TiendaVirtual.Entidades;
using TiendaVirtual.LogicaNegocio;

namespace WebApi.Controllers
{
    public class CarritoController : ApiController
    {
        // GET: api/Carrito
        public IEnumerable<ILineaFactura> Get()
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];

            ICarrito carrito = (ICarrito)HttpContext.Current.Application["carrito"];

            return ln.ListadoProductosCarrito(carrito);

        }

        //// GET: api/Carrito/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Carrito
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT: api/Carrito/5
        public void Put([FromBody]Producto value)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];

            ICarrito carrito = (ICarrito)HttpContext.Current.Application["carrito"];

            ln.AgregarProductoACarrito(value, carrito);
        }

        //// DELETE: api/Carrito/5
        //public void Delete(int id)
        //{
        //}
    }
}
