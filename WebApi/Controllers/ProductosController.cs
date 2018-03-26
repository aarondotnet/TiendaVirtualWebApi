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
    public class ProductosController : ApiController
    {
        // GET: api/Productos
        public IEnumerable<IProducto> Get()
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            return ln.ListadoProductos();
        }

        // GET: api/Productos/5
        public IProducto Get(int id)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            return ln.BuscarProductoPorId(id);
        }

        // POST: api/Productos
        public void Post([FromBody]Producto value)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            ln.AltaProducto(value);
        }

        // PUT: api/Productos/5
        public void Put(int id, [FromBody]Producto value)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            ln.ModificarProducto(value);
        }

        // DELETE: api/Productos/5
        public void Delete(int id)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            ln.BajaProducto(id);
        }
    }
}
