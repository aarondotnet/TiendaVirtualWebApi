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
    public class UsuariosController : ApiController
    {
        // GET: api/Usuarios
        public IEnumerable<IUsuario> Get()
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            return ln.BuscarTodosUsuarios();
        }

        // GET: api/Usuarios/5
        public IUsuario Get(int id)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            return ln.BuscarUsuarioPorId(id);
        }

        // POST: api/Usuarios
        public void Post([FromBody]Usuario value)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            ln.AltaUsuario(value);
        }

        // PUT: api/Usuarios/5
        public void Put(int id, [FromBody]Usuario value)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            ln.ModificarUsuario(value);
        }

        // DELETE: api/Usuarios/5
        public void Delete(int id)
        {
            ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            ln.BajaUsuario(id);
        }
    }
}
